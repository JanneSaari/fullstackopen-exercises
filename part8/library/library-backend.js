const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

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
  type User {
    username: String!,
    favoriteGenre: String!,
    id: ID!
  }

  type Token {
    value: String!
  }

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
    allAuthors: [Author!]!,
    me: User
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
    allAuthors: async() => Author.find({}),
    me: async(root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root})
  },
  Mutation: {
    createUser: async(root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async(root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addBook: async(root, args, context) => {
      if(!context.currentUser){
        throw new GraphQLError('User is not logged in, be sure to include authorization header with valid token', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }
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
    editAuthor: async(root, args, context) => {
      if(!context.currentUser){
        throw new GraphQLError('User is not logged in, be sure to include authorization header with valid token', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }
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
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})