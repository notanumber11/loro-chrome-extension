import { expect } from 'chai';

describe('Hello world test group', () => { // the tests container
    it('Hello world individual test', () => { // the single test
       let a = "123";
        expect(a).to.be.an("string").to.have.property("length").to.equal(3); // this is a little more complex, but still really clear
    });
});