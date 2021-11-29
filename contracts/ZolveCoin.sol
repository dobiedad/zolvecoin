// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ZolveCoin {
  uint public totalSupply = 210000000;
  uint public decimals = 8;
  string public name = "Zolve Coin";
  string public symbol = "ZLV";

  mapping (address => uint) balances;

	constructor() {
		balances[tx.origin] = 1;
	}

  function getBalanceOfAddress(address addr) public view returns(uint) {
		return balances[addr];
	}
}
