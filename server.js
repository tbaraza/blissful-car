const { spawn, exec } = require('child_process');
const runAll = require("npm-run-all");

let child;
module.exports = {
    bootstrap: (done) => {
        // const  options = {
        //     timeout: 100000,
        //     killSignal: 'SIGKILL'
        //   }
        // const child = exec('sh start_server.sh', (error, stdOut, stdErr) => {
        //     if(error) {
        //         console.log('Child process exited with the error', error);
        //     }
        //     console.log('start server stdout', stdOut);
        //     done();
        // });

        // const child = spawn('npm-run-all -p start-backend start-frontend');
        child = spawn('yarn', ['start'], { stdio: 'ignore',  detached: false, shell: true });

        // child.stdout.on('data', (data) => console.log('Data', data));
        // child.stderr.on('error', (error) => {
        //     console.log(`stderr: ${error}`);
        //   });
        child.on('close', (code) => console.log('closing code', code));
        // child.unref();
        done();
    },
    // bootstrap: (done) => {
    //     return runAll(['start-backend'], { parallel: true })
    //     .then((results) => {
    //         console.log('server started', results);
    //         done();
    //     })
    //     .catch(err => {
    //         console.log('failed!'), err;
    //     });
    // },

    teardown: () => {
        console.log('server stopped');
        child.kill('SIGKILL');
        // exec('sh stop_server.sh', (error, stdOut, stdErr) => {
        //     // do what you want!
        //     console.log('stdout', stdOut);
        //     done();
        // });
    }
}



