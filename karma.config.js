module.exports = function (karmaConfig) {

  const withCoverage = process.argv.some(arg => /^-coverage$/.test(arg));
  const isVerbose = process.argv.some(arg => /^-verbose$/.test(arg));

  const config = {
    /** maximum number of tries a browser will attempt in the case of a disconnection */
    browserDisconnectTolerance: 2,

    /** How long will Karma wait for a message from a browser before disconnecting from it (in ms). */
    browserNoActivityTimeout: 20000,

    retryLimit: 3,

    client: {
      args: isVerbose ? ['verbose'] : []
    },

    //logLevel: isVerbose ? karmaConfig.LOG_DEBUG : karmaConfig.LOG_INFO,

    //--- BrowserStack settings
    browserStack: {
      project: 'blinx.js'
    },

    customLaunchers: {
      ChromeDebugging: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9333']
      },
      winxp_chrome: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: 'XP',
        browser: 'Chrome'
      },
      winxp_firefox: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: 'XP',
        browser: 'Firefox'
      },
      winxp_opera: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: 'XP',
        browser: 'Opera'
      },
      win7_ie9: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '7',
        browser: 'IE',
        browser_version: '9'
      },
      win7_ie10: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '7',
        browser: 'IE',
        browser_version: '10'
      },
      win7_ie11: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '7',
        browser: 'IE',
        browser_version: '11'
      },
      win10_chrome: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'Chrome'
      },
      win10_firefox: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'Firefox'
      },
      win10_opera: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'Opera'
      },
      win10_edge: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'Edge'
      },
      osx_safari: {
        base: 'BrowserStack',
        os: 'OS X',
        os_version: 'Snow Leopard',
        browser: 'Safari'
      },
      osx_10_6_safari: {
        base: 'BrowserStack',
        os: 'OS X',
        os_version: 'Snow Leopard',
        browser: 'Safari'
      },
      osx_10_13_safari: {
        base: 'BrowserStack',
        os: 'OS X',
        os_version: 'High Sierra',
        browser: 'Safari'
      },
      iphone4s: {
        base: 'BrowserStack',
        device: 'iPhone 4S',
        os: 'iOS',
        os_version: '5.1'
      },
      ipad2: {
        base: 'BrowserStack',
        device: 'iPad 2 (5.0)',
        os: 'iOS',
        os_version: '5.0'
      },
      google_nexus: {
        base: 'BrowserStack',
        device: 'Google Nexus',
        os: 'Android',
        os_version: '4.0'
      }
    },

    browsers: [
      'winxp_chrome', 'winxp_firefox', 'winxp_opera',
      'win7_ie9', 'win7_ie10', 'win7_ie11',
      'win10_chrome', 'win10_firefox', 'win10_opera', 'win10_edge',
      //'osx_10_6_safari',
      'osx_10_13_safari',
      //'iphone4s', 'ipad2', 'google_nexus'
    ],

    frameworks: [
      'jasmine',
      'karma-typescript'
    ],

    files: [
      'src/**/!(languages).ts',
      'src/**/!(promise).js'
    ],

    preprocessors: {
      'src/**/*.ts': ['karma-typescript'],
      'src/**/*.js': ['karma-typescript']
    },

    reporters: [
      'spec',
      'BrowserStack',
      'karma-typescript'
    ],

    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json',
      coverageOptions: {
        instrumentation: false
      }
    }
  };

  if (withCoverage) {
    Object.assign(config.karmaTypescriptConfig, {
      coverageOptions: {
        instrumentation: true
      },
      reports: {
        'lcovonly': {
          'subdirectory': '',
          'filename': 'lcov.info'
        },
        'html': 'coverage',
        'text-summary': ''
      }
    });
  }

  karmaConfig.set(config);
};
