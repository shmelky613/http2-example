const spdy = require("spdy")
const express = require("express")
const fs = require("fs")
const {promisify} = require("util")

const readFile = promisify(fs.readFile)

const app = express()

app.use(express.static("dist"))

app.get("/", async (req, res) => {
  try {
    if(res.push){
      [
        "/assets/arrow-right.5d7d1239.svg",
        "/assets/BadgeCheck.5359d51f.svg",
        "/assets/chip.9a9392e4.svg",
        "/assets/code.403b046f.svg",
        "/assets/index.9b537732.js",
        "/assets/index.f9c9ac5d.css",
        "/assets/vendor.0ab59486.js",
        
      ].forEach(async (file) => {
        res.push(file, {}).end(await readFile(`dist${file}`))
      })
    }

    res.writeHead(200)
    res.end(await readFile("index.html"))
  }catch(error){
    res.status(500).send(error.toString())
  }
})

spdy.createServer(
  {
    key: fs.readFileSync("./private.key"),
    cert: fs.readFileSync("./certificate.crt")
  },
  app
).listen(8080, (err) => {
  if(err){
    throw new Error(err)
  }
  console.log("Listening on port 8080")
})