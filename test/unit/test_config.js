import _ from 'lodash';
import assert from 'assert';
import config from '../../src/lib/config';

describe('config', () => {
    describe('properties', () => {
        it(`assert 'config' has required properties`, () => {
            assert.strictEqual(_.has(config, 'apiSpecPath'), true);
            assert.strictEqual(_.has(config, 'branch'), true);
            assert.strictEqual(_.has(config, 'root'), true);
            assert.strictEqual(_.has(config, 'repoOrigin'), true);
            assert.strictEqual(_.has(config, 'branchPath'), true);
            assert.strictEqual(_.has(config, 'docsRoot'), true);
            assert.strictEqual(_.has(config, 'uiRoot'), true);
        })
    })
})