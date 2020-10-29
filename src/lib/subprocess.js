'use strict';
import shell from 'shelljs';

const cd = "cd";
const cp = "cp";
const exec = "exec";
const mkdir = "mkdir";
const rm = "rm";

const shellFunctions = {
    cd: shell.cd,
    cp: shell.cp,
    exec: shell.exec,
    mkdir: shell.mkdir,
    rm: shell.rm
}

class Subprocess {

    constructor(command, ...args) {
        this.command = command;
        this.args = args;
    }

    run() {
        return shellFunctions[this.command](...this.args);
    }

    runAndAssert() {
        var exit = this.run()
        if (exit.code != 0) {
            throw `Subprocess '${this.command} ${this.args.join(" ")}' `
                  + `exited with a code of ${exit.code}`;
        }
    }
}

const subprocess = {
    changeDir: (...args) => new Subprocess(cd, ...args).runAndAssert(),
    makeDirs: (...args) => new Subprocess(mkdir, '-p', ...args).runAndAssert(),
    copy: (...args) => new Subprocess(cp, ...args).runAndAssert(),
    copyDirs: (...args) => new Subprocess(cp, '-R', ...args).runAndAssert(),
    copyDirsN: (...args) => new Subprocess(cp, '-Rn', ...args).runAndAssert(),
    removeDirs: (...args) => new Subprocess(rm, '-rf', ...args).runAndAssert(),
    exec: (...args) => new Subprocess(exec, ...args).runAndAssert()
}

export default subprocess;
