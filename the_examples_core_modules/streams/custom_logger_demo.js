const fs = require("fs");
const path = require("path");
const { Console } = require('console');

const logPath = path.join(path.dirname(path.dirname(__dirname)), 'logs')
fs.mkdir(logPath, callback_creating_folder)

function callback_creating_folder(pErr) {
    if (pErr) {
        if (pErr.code === "EEXIST") {
            console.log('file already exists')
        } else {
            throw pErr
        }
    } else {
        console.log('folder created')
    }
    const output = fs.createWriteStream(path.join(logPath, 'stdout.log'), { flags: 'a' });
    const errorOutput = fs.createWriteStream(path.join(logPath, 'stderr.log'), { flags: 'a' });
    // Custom simple logger
    const logger = new Console({ stdout: output, stderr: errorOutput });
    // use it like console
    const count = 5;
    logger.log('count:', count);
    logger.log('count:', count - 1);
    logger.assert(true, 'good in aseert '); // not shown 
    logger.assert(false, 'erorr in aseert ');
    logger.error('juste simple eror')
}