const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../index');


//endpoint tests

describe('GET /blog test', () => {
  it('should return status 200 and two blogs: one sample one new', () => {
    return supertest(app)
      .get('/blogs')
      .expect(200, '[{"blog_id":25,"description":"new blog"},{"blog_id":32,"description":"Sample blog"}]')
  });
});

describe('GET /blog/:id test', () => {
  it('should return status 200 and specific blog by ID', () => {
    return supertest(app)
      .get('/blogs/32')
      .expect(200, '{"blog_id":32,"description":"Sample blog"}')
  });
})

describe('POST /blog test', () => {
  it('should return status 200 and post a new blog', () => {
    return supertest(app)
    .post('/blogs')
    .send({"blog_id":51,"description":"100th blog"})
    .expect(200, '{"blog_id":51,"description":"100th blog"}')
  });
});

describe('DELETE /blog/:id test', () => {
  it('should return status 200 and delete a specific blog by ID', () => {
    return supertest(app)
    .delete('/blogs/51')
    .expect(200)
  });
});



