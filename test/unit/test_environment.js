import _ from 'lodash';
import assert from 'assert';
import environment from '../../src/lib/environment';

describe('environment', () => {
    describe('properties', () => {
        it(`assert 'environment' has required properties`, () => {
            assert.strictEqual(_.has(environment, 'root'), true);
            assert.strictEqual(_.has(environment, 'branch'), true);
        })
    })
})
