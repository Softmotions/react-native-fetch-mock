import 'babel-polyfill';
import expect from 'expect.js';
import FetchMock from '../src';

const fetch = new FetchMock(require('../__mocks__')).fetch;
describe('test fetch mock', () => {
  it('fetch /api/users data', async () => {
    const { data } = await fetch('/api/users');
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
  });

  it('fetch /api/users with parameters', async () => {
    const { data } = await fetch('/api/users', {
      name: 'John',
    });
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(1);
  });
});
