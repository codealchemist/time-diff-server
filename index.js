#!/usr/bin/env node
const WebSocket = require('ws')
const port = process.env.PORT || 8001
const wss = new WebSocket.Server({
  perMessageDeflate: false,
  port
}, onListening)
const events = {
  time: onTime
}

function onListening () {
  log(`LISTENING ON PORT ${port}`)
}

wss.on('connection', (ws) => {
  const host = ws.upgradeReq.headers.host
  log('client connected:', host)

  ws.on('message', (data) => {
    log(`got message from ${host}`, data)
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
  console.log('[ TIME-DIFF-SERVER ]-->', ...arguments)
}
