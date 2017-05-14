#!/usr/bin/env node
const WebSocket = require('ws')
const chalk = require('chalk')
const ascii = require('../ascii-art')
ascii()

const port = process.env.PORT || 8001
const wss = new WebSocket.Server({
  perMessageDeflate: false,
  port
}, onListening)
const events = {
  time: onTime
}

function onListening () {
  log(chalk.bold(`WS TIME-DIFF-SERVER UP on port ${port}`))
}

wss.on('connection', (ws) => {
  const host = ws.upgradeReq.headers.host
  log(`client ${chalk.yellow('connected')} ${chalk.blue(host)}`)

  ws.on('message', (data) => {
    log(`got request from ${chalk.blue(host)}`)
    const {type, value} = JSON.parse(data)
    if (!events[type]) return
    events[type](ws, value)
  })
})

function send (ws, message) {
  const data = JSON.stringify(message)
  ws.send(data)
}

function onTime (ws) {
  const time = (new Date()).getTime()
  send(ws, {type: 'time', value: time})
}

function log () {
  const ts = (new Date()).toISOString()
  console.log(`${chalk.dim(ts)}:`, ...arguments)
}
