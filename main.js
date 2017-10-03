var SHA256 = require('crypto-js/sha256')
class Block{
	constructor (index,timestamp,data,previoiusHash=''){
		this.index=index;
		this.timestamp=timestamp;
		this.data=data;
		this.previoiusHash=previoiusHash;
		this.hash='';
	}
	calculateHash(){
		return SHA256(this.index+this.previoiusHash+this.timestamp+JSON.stringify(this.data)).toString();
	}
}
class Blockchain{
	constructor(){
		this.chain=[this.createGenisisBlock()];
	}
	createGenisisBlock(){
		return new Block(0,'21/09/2017','Genisis Block','0');
	}
	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}
	addBlock(newBlock){
		newBlock.previoiusHash=this.getLatestBlock().hash;
		newBlock.hash=newBlock.calculateHash();
		this.chain.push(newBlock);
	}
	isChainValid(){
		for (var i = 1; i < this.chain.length; i++) {
			var currentBlock= this.chain[i];
			var previoiusBlock=this.chain[i-1];
			if(currentBlock.hash != currentBlock.calculateHash())
				return false;
			if (currentBlock.previoiusHash != previoiusBlock.hash) {
				return false;
			}
		}
		return true;
	}
}
var coin = new Blockchain();
coin.addBlock(new Block(1,'22/09/2017',{amount:4}));
coin.addBlock(new Block(2,'25/09/2017',{amount:10}));
console.log('Is Blockchain valid?'+coin.isChainValid());
coin.chain[1].data = {amount:100};
//coin.chain[1].hash = coin.chain[1].calculateHash();
//console.log('Is Blockchain valid?'+coin.isChainValid());
console.log(JSON.stringify(coin,null,4));