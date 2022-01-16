// compile code will go here
const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inbox_path = path.resolve(__dirname,'contracts','Inbox.sol');

const src = fs.readFileSync(inbox_path,{encoding:'utf-8'})

module.exports = solc.compile(src,1).contracts[":Inbox"]