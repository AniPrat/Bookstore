import { Book } from './book';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book('Angular','RL Jain','',3)).toBeTruthy();
  });
});
