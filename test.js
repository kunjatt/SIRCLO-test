import request from 'supertest';
const baseUrl = 'https://qa-interview.srcli.xyz';

describe('Get homepage', () => {
  it('Sukses to homepage', async () => {
    const response = await request(baseUrl)
    .get('/');
    // expect(response.body).toEqual('Welcome!')
    expect(response.type).toEqual('text/html');
    expect(response.text).toContain('Welcome!');
    expect(response.statusCode).toBe(200);
  })
})

// Get page before login
describe('Get login page', () => {
  it('Success open login page', async () => {
    const response = await request(baseUrl)
    .get('/login');
    expect(response.type).toEqual('text/html');
    expect(response.text).toContain('username');
    expect(response.statusCode).toBe(200);
  })
})


// Sukses Login
describe('POST login', () => {
  it('Success login with valid email and password', async () => {
    const response =  await request(baseUrl)
    .post('/login')
    .set('Content-type', 'application/x-www-form-urlencoded')
    .send({
      username: 'root',
      password: 'root123'
    })
    expect(response.statusCode).toBe(302)
  })
})

// Failed login with invalid email / password
describe('POST failed login', () => {
  it('Failed login with invalid email and password', async () => {
    const response =  await request(baseUrl)
    .post('/login')
    .set('Content-type', 'application/x-www-form-urlencoded')
    .send({
      username: 'root97123',
      password: 'igashd'
    })
    expect(response.text).toContain('The password or username is wrong');
    expect(response.statusCode).toBe(401)
  })
})

// Get data before login
describe('Get data before login', () => {
  it('Failed to get data and open login page', async () => {
    const response = await request(baseUrl)
    .get('/data');
    expect(response.text).toContain('<a href="/login">Found</a>')
    expect(response.statusCode).toBe(302);
  })
})

// Get data after login
describe('Get data after login', () => {
  it('Success to get data', async () => {
    const res = await request(baseUrl)
    .get('/data')
    .set('Cookie', 'username=root')
    expect(res.type).toEqual('text/html');
    expect(res.text).toContain('TimeStamp');
    expect(res.statusCode).toBe(200);
  })
})

// Get data after login with invalid filter
describe('Post data after login with invalid filter', () => {
  it('Failed to post data because start date > end date', async () => {
    const res = await request(baseUrl)
    .post('/filter')
    .set('Content-type', 'application/x-www-form-urlencoded')
    .set('Cookie', 'username=root')
    .send({
      start: '2018-07-07',
      end: '2018-07-05'
    })
    expect(res.text).toContain('Filter Parameter are wrong');
    expect(res.statusCode).toBe(405);
  })
})

// Logout
describe('POST logout', () => {
  it('Success to logout', async () => {
    const res = await request(baseUrl)
    .post('/logout')
    .set('Cookie', 'username=root')
    expect(res.statusCode).toBe(302);
  })
})


// End Point lainnya
describe('Get another page / endpoint', () => {
  it('Failed to get another page / endpoint', async () => {
    const response = await request(baseUrl)
    .get('/register');
    expect(response.text).toContain('Page not found');
    expect(response.statusCode).toBe(404);
  })
})




