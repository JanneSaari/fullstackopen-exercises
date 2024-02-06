const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const cleardb = async () => {
  
  const deletedAuthors = await Author.deleteMany()
  const deletedBooks = await Book.deleteMany()
  const deletedUsers = await User.deleteMany()

  console.log('deleted entries: ', deletedAuthors.deletedCount, deletedBooks.deletedCount, deletedUsers.deletedCount)
  
  const testuser = new User({
    username: "testuser",
    favoriteGenre: "testgenre"
  })
  testuser.save()
}

cleardb()