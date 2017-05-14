#!/usr/bin/env node
const UdpNode = require('udp-node')
const chalk = require('chalk')
const ascii = require('../ascii-art')
ascii()

const port = process.env.PORT || 3025
const node = new UdpNode()
node
  .set({
    name: 'time-server',
    type: 'time-server',
    logLevel: 'error'
  })
log(chalk.bold(`UDP TIME-DIFF-SERVER UP on port ${port}`))

node.on('time', (message, rinfo) => {
  log(`got request from ${chalk.blue(rinfo.address)}:${chalk.blue(rinfo.port)}`)

  onTime(rinfo)
})

function onTime (rinfo) {
  const time = (new Date()).getTime()
  node.send({
    type: 'time',
    port,
    address: rinfo.address,
    value: time
  })
}

function log () {
  const ts = (new Date()).toISOString()
  console.log(`${chalk.dim(ts)}:`, ...arguments)
}
