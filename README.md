# time-diff-server
Receives connections from time-diff-client sending current server time to it, useful for time synchronization.

## How it works

Waits for socket connections from instances of [time-diff-client](https://github.com/codealchemist/time-diff-client).
Answers `time` requests from clients with server's current time.
Clients will use this data to get time difference between their clocks and the server's.

Defaults to port `8001`.

The implementation is based on NTP.


## Install

`npm install -g time-diff-server`


## Start

`tds`

Or, to specify a custom port:

`PORT=7000 tds`


Enjoy!
