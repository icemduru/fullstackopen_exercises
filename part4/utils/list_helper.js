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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
