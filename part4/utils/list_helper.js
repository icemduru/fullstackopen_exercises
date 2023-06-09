const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const likesArray = [];
  blogs.forEach((eachBlog) => {
    likesArray.push(eachBlog.likes);
  });
  return likesArray.reduce((sum, item) => sum + item, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
