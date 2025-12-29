const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

async function test() {
  const { app } = require('./src/app');
  
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };
  const token = jwt.sign(payload, 'KSLJFLDKSJFD');
  const session = { jwt: token };
  const base64 = Buffer.from(JSON.stringify(session)).toString('base64');
  
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', [`session=${base64}`])
    .send({ title: 'test', price: 20 });
  
  console.log('Status:', response.status);
  console.log('Body:', JSON.stringify(response.body, null, 2));
  console.log('Text:', response.text);
}

test().catch(e => {
  console.error('Error:', e.message);
  console.error(e);
}).finally(() => process.exit());
