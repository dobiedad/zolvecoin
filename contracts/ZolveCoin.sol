// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ZolveCoin {
  uint public totalSupply = 2100000000000000;
  uint public decimals = 8;
  string public name = "Zolve Coin";
  string public symbol = "ZLV";

  mapping (address => uint) balances;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 1;
	}

  function balanceOf(address addr) public view returns(uint) {
		return balances[addr];
	}

  function transfer(address to, uint amount) public returns(bool) {
    require(balanceOf(msg.sender) >= amount, "balance too low" );

    balances[to] += amount;
    balances[msg.sender] -= amount;

    emit Transfer(msg.sender, to, amount);

    return true;
  }
  // NOTE - Tokens which don’t implement this method
  // will never flow across the Binance Chain and Binance Smart Chain.
  // function getOwner() external view returns (address);
}
