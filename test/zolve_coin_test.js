const ZolveCoin = artifacts.require("ZolveCoin");

contract("ZolveCoin", function (accounts) {
  it('credits the owners balance with 1', async () => {
    const contract = await ZolveCoin.deployed();
    const balance = await contract.getBalanceOfAddress.call(accounts[0]);

    assert.equal(balance.valueOf().toString(), '1');
  });

  it('has a max cap of 21 million', async () => {
    const contract = await ZolveCoin.deployed();

    assert.equal((await contract.totalSupply()).toString(), '210000000');
    assert.equal((await contract.decimals()).toString(), '8');
  });

  it('has a name and symbol', async () => {
    const contract = await ZolveCoin.deployed();

    assert.equal((await contract.name()).toString(), 'Zolve Coin');
    assert.equal((await contract.symbol()).toString(), 'ZLV');
  });
});
