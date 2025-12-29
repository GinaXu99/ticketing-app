import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });

  await ticket.save();

  return ticket;
};

it('fetches orders for an particular user', async () => {
  //create three tickets
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const userOne = global.signin();
  const userTwo = global.signin();

  //create one order for user#1
  await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticketOne._id.toHexString() })
    .expect(201);

  //create two orders for user#2
  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: ticketTwo._id.toHexString() })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: ticketThree._id.toHexString() })
    .expect(201);

  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)
    .expect(200);

  //test for orders for user#2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderOne._id);
  expect(response.body[1].id).toEqual(orderTwo._id);
  expect(response.body[0].ticket._id).toEqual(ticketTwo._id);
  expect(response.body[1].ticket._id).toEqual(ticketThree._id);
});
