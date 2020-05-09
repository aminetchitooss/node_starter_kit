const http = require('http')
const fs = require('fs')
const os = require('os')
const path = require('path')
const port = process.env.PORT || 3000

http.createServer((req, res) => {

    const isIndex = req.url === "/"
    const isIcon = req.url === "/favicon.ico"
    const fileName = isIndex ? "index" : req.url;
    const isApi = req.url.split('/api').length > 1
    const filePath = path.join(__dirname, 'public', fileName + (isIcon ? "" : (isApi ? ".json" : ".html")))

    // const stream = fs.createReadStream(filePath)

    // stream.pipe(res)

    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            if (err.code == "ENOENT") {
                res.writeHead(301, { Location: '/404' })
                res.end()
                // fs.readFile(path.join(__dirname, 'public', "404.html"), 'utf8', (err, content) => {
                //     res.end(content)
                // })
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else if(!isIcon){
            const contentType = getContentType(path.extname(filePath))
            if (isIndex) {
                fs.readdir(path.join(__dirname, 'public', "api"), (err, files) => {

                content = `${content.split('</body>')[0]}
                ${createDisplay(os.cpus(), files, req.headers.host)} 
                </body>
                ${content.split('</body>')[1]}`
                    res.writeHead(200, { 'content-type': contentType })
                    res.end(content)
                    
                });
            } else {
                res.writeHead(200, { 'content-type': contentType })
                res.end(content)
            }

        }else{
            res.end(content)
        }
    })

}).listen(port, () => console.log('listening now ...'))

function createDisplay(pCpus, pFiles, pHost) {

    let vResult = `
   
        <button class="btn btn-lg btn-primary" data-toggle="collapse" data-target="#collapseExample">
            show info
        </button>
        <div class="collapse card" id="collapseExample" >
            <ul>  
                <p>${pCpus.length}Cores </p>
                <li> Model ==> ${pCpus[0].model}  </li>
                <li> Speed ==> ${pCpus[0].speed}  </li>
            </ul>
        </div>
        <div class="api">
            <h2>List of ssssavailable APIs </h2> 
            <ul>`

    for (const file of pFiles) {
        vResult += `<a href="/api/${file.split('.')[0]}" target="_blank" >
         ${file.split('.')[0]}  </a>`
    }

    return vResult + '</ul></div>'
}
function getContentType(param) {
    switch (param) {
        case '.json':
            return 'application/json'
        case '.html':
            return 'text/html'
    }
}