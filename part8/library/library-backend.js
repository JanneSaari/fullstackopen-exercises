const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const Book = require('./models/Book')
const Author = require('./models/Author')

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
    bookCount: async() => Book.collection.countDocuments(),
    authorCount: async() => Author.collection.countDocuments(),
    allBooks: async(root, args) => {
      const books = await Book.find({ 
        ...(args.author && {author: await Author.findOne({ name: args.author })}),
        ...(args.genre && {genres: args.genre})
      })
      .populate('author')
      
      console.log('args,', args)
      console.log('books: ', books)
      return books
    },
    allAuthors: async() => Author.find({}) 
  },
  Author: {
    bookCount: (root) => 
      books.reduce( (count, book ) =>
        book.author === root.name ? count + 1 : count,
        0)
  },
  Mutation: {
    addBook: async(root, args) => {
      const book = new Book({ ...args })
      let author = await Author.findOne({name: args.author})
      if(!author){
        const newAuthor = new Author({name: args.author})
        author = await newAuthor.save()
      }
      book.author = author
      return book.save()
    },
    editAuthor: async(root, args) => {
      let editedAuthor = authors.find(n => n.name === args.name)
      if(!editedAuthor)
        return null
      if(args.setBornTo)
        editedAuthor.born = args.setBornTo

      authors = authors.map(author => 
        author.name === editedAuthor.name ? editedAuthor : author)
      return editedAuthor
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