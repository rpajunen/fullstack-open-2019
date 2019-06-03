const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    author: 'Author of the blog1',
    title: 'Title of blog1',
    url: 'www.url1.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    author: 'Author of the blog2',
    title: 'Title of blog2',
    url: 'www.url2.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    author: 'Author of the blog3',
    title: 'Title of blog3',
    url: 'www.url3.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }