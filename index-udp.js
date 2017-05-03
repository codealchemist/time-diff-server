#!/usr/bin/env node
const UdpNode = require('udp-node')
const node = new UdpNode()
node
  .set({
    name: 'time-server',
    type: 'time-server'
  })
log('TIME SERVER UP')

node.on('time', (message, rinfo) => {
  // log(`got time message`, rinfo)
  onTime(rinfo)
})

function onTime (rinfo) {
  const time = (new Date()).getTime()
  node.send({
    type: 'time',
    port: 3025,
    address: rinfo.address,
    value: time
  })
}

function log () {
  console.log('[ TIME-DIFF-SERVER ]-->', ...arguments)
}
