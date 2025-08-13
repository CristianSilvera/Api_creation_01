const http = require('node:http')

const server = http.createServer((request, replay) => {
    replay.write("Hello World")

    replay.end()
} )

server.listen(3333).on('listening', () => {
    console.log('HTTP server running!')
});

