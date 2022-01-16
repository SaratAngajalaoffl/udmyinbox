const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const {interface,bytecode} = require('../compile')

const web3 = new Web3(ganache.provider())

let accounts,inbox;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts()
	inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode, arguments:['Hi There']}).send({from: accounts[0], gas: '1000000'})
})

describe('Inbox', () => {
	it('Deployed a contract',() => {
		assert.ok(inbox.options.address)
	})

	it('Has the correct default value',async () =>{
		const message = await inbox.methods.message().call()

		assert.equal(message,'Hi There','Default Value is not set correctly')
	})

	it('Can change the message correctly',async () => {
		const newMessage = "Hi Sarat"
		await inbox.methods.setMessage(newMessage).send({from: accounts[0]})

		const message = await inbox.methods.message().call()
		assert.equal(message,newMessage,'Value not modified correctly')
	})
}) 