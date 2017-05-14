# time-diff-server
Receives requests from [time-diff-client](https://github.com/codealchemist/time-diff-client).
Responds with current server time to. Useful for time synchronization.

## How it works

Waits for socket connections from instances of [time-diff-client](https://github.com/codealchemist/time-diff-client).
Answers `time` requests from clients with server's current time.
Clients will use this data to get the time difference between their clocks and the server's.

**time-diff-server** provides WebSockets and UDP modes.

Default WS port is `8001`, UDP is `3024`.


## Install

`npm install -g time-diff-server`


## Start

`tds-udp`: Starts in UDP mode, the recommended one because its lower latency.

`tds-ws`: Starts in WebSockets mode.

Passing command line arguments:

`PORT=7000 tds-ws`

Or:

`PORT=7000 tds-udp`


## Test code changes

If you clone this repo to play with **time-diff-server** you can test your
code running:

`npm test`

And:

`npm run test-focus`


Enjoy!
