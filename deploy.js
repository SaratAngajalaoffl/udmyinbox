const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const {interface,bytecode} = require('./compile');

const provider = new HDWalletProvider('chuckle shell hurry blind face ice coast write glory satoshi main fly','https://rinkeby.infura.io/v3/ecb3c2bbb5ab46bbb11afa9137c44ab8')

const web3 = new Web3(provider)

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account',accounts[0])

	const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode,arguments: ['Hi There!']}).send({gas: '1000000',from: accounts[0]})

	console.log('Contract deployed to', result.options.address)
}

deploy()
