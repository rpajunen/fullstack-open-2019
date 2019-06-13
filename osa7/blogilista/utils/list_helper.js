const totalLikes = blogs => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = blogs => {
  const favoriteBlog = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }
}

module.exports = {
  totalLikes, favoriteBlog
}