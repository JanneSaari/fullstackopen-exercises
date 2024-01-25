const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const Book = require('./models/Book')
const Author = require('./models/Author')
const { GraphQLError } = require('graphql')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!,
    id: ID!
  }

  type Author {
    name: String!,
    born: Int,
    bookCount: Int!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async() => Book.countDocuments(),
    authorCount: async() => Author.countDocuments(),
    allBooks: async(root, args) => await Book.find({ 
        ...(args.author && {author: await Author.findOne({ name: args.author })}),
        ...(args.genre && {genres: args.genre})
      })
      .populate('author'),
    allAuthors: async() => Author.find({}) 
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root})
  },
  Mutation: {
    addBook: async(root, args) => {
      const book = new Book({ ...args })
      let author = await Author.findOne({name: args.author})
      if(!author){
      try {
          const newAuthor = new Author({name: args.author})
          author = await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Adding new author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }
      try {
        book.author = author
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      return book
    },
    editAuthor: async(root, args) => {
      let updatedAuthor
      try {
        updatedAuthor = await Author.findOneAndUpdate({ name: args.name }, 
          {
            ...(args.setBornTo && {born: args.setBornTo})
          }, {new: true})
      } catch (error) {
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})