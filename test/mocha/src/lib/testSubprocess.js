import assert from 'assert';
import {
    cd,
    cp,
    exec,
    mkdir,
    rm,
    subprocess
} from '@lib/subprocess';

// test cases for runAndAssert function
let runAndAssertTC = [
    {command: exec, args: ['ls -1 > /dev/null'], expError: false},
    {command: exec, args: ['pwd'], expError: false},
    {command: rm, args: ["-r", "/dir/that/doesnt/exist"], expError: true},
    {command: cd, args: ["-r", "/dir/that/doesnt/exist"], expError: true},
]

describe('subprocess', () => {
    describe('runAndAssert', () => {
        it(`asserts runAndAssert throws an error when expected`, () => {
            runAndAssertTC.forEach(tc => {
                let subp = subprocess(tc.command, ...tc.args);
                try {
                    subp.runAndAssert()
                    assert.strictEqual(false, tc.expError);
                } catch (err) {
                    assert.strictEqual(true, tc.expError)
                }
            })
        })
    })
})

