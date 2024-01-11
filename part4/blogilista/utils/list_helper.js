const collection = require("lodash");
const logger = require("./logger");

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach((blog) => {
    likes += blog.likes;
  });
  return likes;
};

const mostLikes = (blogs) => {
  const mostLikes = collection
    .orderBy(getLikeCounts(blogs), "likes", "desc")
    .at(0);
  logger.info(mostLikes);
  return mostLikes;
};

const getLikeCounts = (blogs) => {
  const likeCounts = collection(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      likes: collection.sumBy(objs, "likes"),
    }))
    .value();
  logger.info(likeCounts);
  return likeCounts;
};

const favoriteBlog = (blogs) => {
  let favoriteBlog = null;
  // {
  //   title: 'Canonical string reduction',
  //   author: 'Edsger W. Dijkstra',
  //   likes: 12
  // }
  blogs.forEach((blog) => {
    if (favoriteBlog === null) {
      favoriteBlog = blog;
    }
    if (blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog;
    }
  });

  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  const mostBlogs = collection
    .orderBy(getBlogCounts(blogs), "blogs", "desc")
    .at(0);
  logger.info(mostBlogs);
  return mostBlogs;
};

const getBlogCounts = (blogs) => {
  const blogCounts = collection.map(
    collection.countBy(blogs, "author"),
    (val, key) => ({ author: key, blogs: val }),
  );
  logger.info(blogCounts);
  return blogCounts;
};

module.exports = { dummy, totalLikes, mostLikes, favoriteBlog, mostBlogs };
