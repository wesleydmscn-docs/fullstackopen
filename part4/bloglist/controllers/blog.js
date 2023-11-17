const blogRouter = require("express").Router()

const Blog = require("../models/blog")
const User = require("../models/user")

blogRouter.get("/api/blogs", async (request, response) => {
  const blogResponse = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })

  response.json(blogResponse)
})

blogRouter.get("/api/blogs/:id", async (request, response) => {
  const { id } = request.params
  const blogResponse = await Blog.findOne({ _id: id })
  response.json(blogResponse)
})

blogRouter.post("/api/blogs", async (request, response) => {
  const { title, author, likes, url, user } = request.body

  if (!title || !author || !url) {
    return response.status(400).end()
  }

  const getUser = await User.findById(user)

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: getUser.id,
  })

  const blogResponse = await blog.save()

  getUser.blogs = getUser.blogs.concat(blogResponse._id)

  await getUser.save()

  response.status(201).json(blogResponse)
})

blogRouter.delete("/api/blogs/:id", async (request, response) => {
  const { id } = request.params
  await Blog.findByIdAndDelete(id)
  response.status(202).end()
})

blogRouter.put("/api/blogs/:id", async (request, response) => {
  const { id } = request.params
  const { title, author, url, likes } = request.body

  const targetBlog = await Blog.findById(id)

  targetBlog.title = title || targetBlog.title
  targetBlog.author = author || targetBlog.author
  targetBlog.url = url || targetBlog.url
  targetBlog.likes += likes || 0

  const responseDB = await targetBlog.save()

  response.status(204).json(responseDB)
})

module.exports = blogRouter
