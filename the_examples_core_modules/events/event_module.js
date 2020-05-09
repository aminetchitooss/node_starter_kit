const { EventEmitter } = require('events')

//This example below fo using event emitter class
const emitter = new EventEmitter()

emitter.on('listener', (arg) => {
    console.log('event fired', arg)
})

emitter.emit('listener', { data: 1 })

// using a class with a method log


class Logger extends EventEmitter {

    logMethod(param) {
        this.emit('fire', param)
    }
}

module.exports = Logger