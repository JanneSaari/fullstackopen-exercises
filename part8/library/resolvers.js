const {GraphQLError} = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

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
        const savedBook = await book.save()

        const bookCount = author.bookCount + 1
        const updatedAuthor = await Author.updateOne({name: author.name}, {bookCount: bookCount})
        console.log(updatedAuthor)
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

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
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers