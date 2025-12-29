import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@ticketingapppkg/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
