const ZolveCoin = artifacts.require("ZolveCoin");

contract("ZolveCoin", function (accounts) {
  it('owner starts with 1 coin', async () => {
    const contract = await MetaCoin.deployed();
    const balance = await contract.getBalance.call(accounts[0]);

    assert.equal(balance.valueOf(), 1);
  });
});
