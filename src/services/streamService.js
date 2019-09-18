import { BehaviorSubject } from "rxjs";

const subjects = new Map();

export const streamService = {
  add: (channel, data) => {
    let subject = subjects.get(channel);
    return subject && subject.next(data);
  },
  clear: channel => {
    let subject = subjects.get(channel);
    return subject && subject.next();
  },
  get: channel => {
    let subject = subjects.get(channel);
    return subject && subject.asObservable();
  },
  createNewChannel: channel => {
    if (!subjects.has(channel)) {
      subjects.set(channel, new BehaviorSubject());
    }
  }
};
