const { spawn, exec } = require('child_process');
const os = require('os');
const kill = require('tree-kill');

let server;

const isWin32 = process.platform === 'win32';

exports.config = {
  require: ['ts-node/register'],
  tests: './*_test.ts',
  timeout: 10000,
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://localhost:3000',
      show: false,
      browser: 'chromium',
      chromium: {
        args: [
          // '--proxy-bypass-list=*',
          // '--disable-gpu',
          // '--disable-dev-shm-usage',
          // '--disable-setuid-sandbox',
          // '--no-first-run',
          '--no-sandbox',
          // '--no-zygote',
          // '--single-process',
          '--ignore-certificate-errors',
          '--ignore-certificate-errors-spki-list',
          // '--enable-features=NetworkService',
        ],
      },
    },
  },
  include: {
    I: './steps_file.ts',
  },
  bootstrap: (done) => {
    server = spawn(isWin32 ? 'npm.cmd' : 'npm', ['start'], {
      detached: false,
      encoding: 'utf8',
    });

    let output;
    let runned = false;

    server.on('close', (e) => {
      console.log(`✅ development server is killed ${e}`);
    });

    server.stdout.on('data', (data) => {
      output += data;
      if (
        !runned &&
        output.includes('Project is running') &&
        output.includes('Prism is listening')
      ) {
        console.log('✅ development server is running');
        runned = true;
        return done();
      }
      console.log(data.toString());
    });
  },
  teardown: (done) => {
    kill(server.pid, done);
  },
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          steps: true,
        },
      },
      'mocha-junit-reporter': {
        stdout: './output/console.log',
        options: {
          mochaFile: './output/test-results.xml',
        },
        attachments: true, //add screenshot for a failed test
      },
    },
  },
  name: 'e2e',
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
