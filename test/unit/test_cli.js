import _ from 'lodash';
import assert from 'assert';
import { version, help } from '../../src/lib/cli';

describe('cli', () => {
    describe('version', () => {
        it('asserts version function exists', () => {
            assert.equal(typeof(version), "function");
        })
    }),
    describe('help', () => {
        it('asserts help function exists', () => {
            assert.equal(typeof(help), "function");
        })
    })
})