const Logger = require('./event_module')

const LoggerClass = new Logger()

LoggerClass.addListener('fire', (arg) => {
    console.log('event fired by method', arg)
})

LoggerClass.logMethod({ text: "hello" })