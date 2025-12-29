import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from '@ticketingapppkg/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
