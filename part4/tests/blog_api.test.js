const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper')

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[3]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[4]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[5]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain(
    'React patterns',
  );
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Add me',
    author: 'Paran',
    url: 'http://add12313w32rfwefw23wd1.com',
    likes: 230,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((r) => r.title);
  expect(titles).toContain(
    'Add me',
  );
});

test('a blog without content is not added', async () => {
  const newBlog = {
    title: 'hope it is not added',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultBlog.body).toEqual(blogToView);
});

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  );

  const titles = blogsAtEnd.map((r) => r.title);

  expect(titles).not.toContain(blogToDelete.title);
});

test('unique identifier property of the blog posts is named id', async () => {
  const allBlogs = await helper.blogsInDb();
  const blogToView = allBlogs[0];
  expect(blogToView.id).toBeDefined();
  expect(blogToView._id).not.toBeDefined();
});

test('add blog without like data and expect zero like', async () => {
  const newBlog = {
    title: 'No likes',
    author: 'Not likable',
    url: 'http://likeshouldbezero.zeroo',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const blogToexpectZeroLike = blogsAtEnd[blogsAtEnd.length - 1];
  // console.log(blogToexpectZeroLike);
  expect(blogToexpectZeroLike.likes).toEqual(0);
});

test('add blog without url and expect bad request', async () => {
  const newBlog = {
    title: 'No url',
    author: 'url missing',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
