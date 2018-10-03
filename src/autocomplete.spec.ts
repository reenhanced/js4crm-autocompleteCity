import { search } from './autocomplete';
import { expect } from 'chai';
import 'mocha';

describe('search', () =>{
  it('should autocomplete the name given', () =>{
    const result = search('new yor');
    console.log(result);
  });
});