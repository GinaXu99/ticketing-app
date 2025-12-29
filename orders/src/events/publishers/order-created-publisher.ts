import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@ticketingapppkg/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
