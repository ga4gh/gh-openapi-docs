import assert from 'assert';
import environment from '@lib/environment';

describe('environment', () => {
    describe('environment properties', () => {
        it(`assert environment properties are correctly set`, () => {
            assert.equal(environment.env, 'production');
        })
    })
})