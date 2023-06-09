const lodash = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const likesArray = [];
  blogs.forEach((eachBlog) => {
    likesArray.push(eachBlog.likes);
  });
  return likesArray.reduce((sum, item) => sum + item, 0);
};

const favoriteBlog = (blogs) => {
  const max = Math.max(...blogs.map((eachBlog) => eachBlog.likes));
  const findedFavorite = blogs.find((eachBlog) => eachBlog.likes === max);
  if (findedFavorite) {
    return {
      title: findedFavorite.title,
      author: findedFavorite.author,
      likes: findedFavorite.likes,
    };
  }
  return null;
};
const mostBlogs = (blogs) => {
  const countedAuthors = lodash.countBy(blogs, 'author');
  if (Object.keys(countedAuthors).length) {
    const max = Math.max(...Object.values(countedAuthors));
    const author = Object.keys(countedAuthors)
      .reduce((a, b) => (countedAuthors[a] > countedAuthors[b] ? a : b));
    return {
      author,
      blogs: max,
    };
  }
  return null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
