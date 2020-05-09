const http = require('http')
let curentusers = 0


// http.createServer((req, res) => {
//     res.write('Hello World');
//     res.end();
// }).listen(3000, () => console.log('listening'))


const server = http.createServer()

server.on('connection', (socket) => {
    curentusers++;
    console.log(curentusers)
})

server.listen(3000, () => console.log('listening'))