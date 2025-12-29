import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@ticketingapppkg/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    console.log('User ID:', req.currentUser!.id);
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    console.log('Ticket built, about to save');
    try {
      await ticket.save();
      console.log('Ticket saved, version:', ticket.version);
      console.log('Ticket id:', ticket._id);
    } catch (err) {
      console.error('SAVE ERROR:', err);
      throw err;
    }

    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket._id.toHexString(),
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });
    console.log('Event published');

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
