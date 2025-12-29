import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@ticketingapppkg/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
