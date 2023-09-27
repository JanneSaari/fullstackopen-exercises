// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => {
    likes += blog.likes
  })
  return likes
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = null
  // {
  //   title: 'Canonical string reduction',
  //   author: 'Edsger W. Dijkstra',
  //   likes: 12
  // }
  blogs.forEach(blog => {
    if(favoriteBlog === null){
      favoriteBlog = blog
    }
    if(blog.likes > favoriteBlog.likes){
      favoriteBlog = blog
    }
  })

  return favoriteBlog
}

module.exports = { dummy, totalLikes, favoriteBlog }