import { Ticket } from '../ticket';

it('implements optimistic concurrency control ', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  await ticket.save();
  const firstInstance = await Ticket.findById(ticket._id.toHexString());
  const secondInstance = await Ticket.findById(ticket._id.toHexString());

  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  await firstInstance!.save();
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error('should not reach this line!');
});

it('increments the version number on multiple save', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '3949',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  ticket.set({ price: 100 });
  await ticket.save();
  expect(ticket.version).toEqual(1);
  ticket.set({ price: 200 });
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
