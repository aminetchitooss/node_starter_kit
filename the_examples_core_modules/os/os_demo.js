const os = require('os');

//  Getting the CPU Core Info
console.log(os.cpus());

// Getting the free memory
console.log(os.freemem());

// Getting the total memory
console.log(os.totalmem());

// Getting how long the system has been up and running
console.log(os.uptime());
