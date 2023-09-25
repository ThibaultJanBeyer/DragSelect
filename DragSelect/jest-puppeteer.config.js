let jest_puppeteer_conf = {
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 30000,
    headless: 'new',
    dumpio: true, // Whether to pipe the browser process stdout and stderr
  },
}

if (process.env.DEBUG) {
  jest_puppeteer_conf.launch.headless = false // for debug:  to see what the browser is displaying
  // jest_puppeteer_conf.launch.slowMo = 250;  // slow down by 250ms for each step
  jest_puppeteer_conf.launch.devtools = true // This lets you debug code in the application code browser
}

module.exports = jest_puppeteer_conf
