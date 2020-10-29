import assert from 'assert';
import subprocess from '@lib/subprocess';

// test cases for runAndAssert function
let subprocessTC = [
    {command: subprocess.changeDir, args: ["/dir/that/doesnt/exist"], expError: true},
    {command: subprocess.makeDirs, args: [".testtmp"], expError: false},
    {command: subprocess.copy, args: [".testtmp0", ".testtmp1"], expError: true},
    {command: subprocess.copyDirs, args: [".testtmp", ".testtmp1"], expError: false},
    {command: subprocess.copyDirsN, args: [".testtmp", ".testtmp2"], expError: false},
    {command: subprocess.removeDirs, args: [".testtmp"], expError: false},
    {command: subprocess.removeDirs, args: [".testtmp1"], expError: false},
    {command: subprocess.removeDirs, args: [".testtmp2"], expError: false},
    {command: subprocess.removeDirs, args: ["/dir/that/doesnt/exist"], expError: true},
    {command: subprocess.exec, args: ['ls -1 > /dev/null'], expError: false},
    {command: subprocess.exec, args: ['pwd'], expError: false},
]

describe('subprocess', () => {
    describe('subprocess', () => {
        it(`asserts subprocess functions throw an error when expected`, () => {
            subprocessTC.forEach(tc => {
                try {
                    tc.command(...tc.args);
                    assert.strictEqual(false, tc.expError);
                } catch (err) {
                    assert.strictEqual(true, tc.expError);
                }
            })
        })
    })
})

