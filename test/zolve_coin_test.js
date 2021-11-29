const ZolveCoin = artifacts.require("ZolveCoin");

contract("ZolveCoin", function (accounts) {
  var contract;

  beforeEach(function() {
     return ZolveCoin.new()
     .then(function(instance) {
        contract = instance;
     });
  });

  it('credits the owners balance with 1', async () => {
    const balance = await contract.balanceOf(accounts[0]);

    assert.equal(balance.valueOf().toString(), '1');
  });

  it('has a max cap of 21 million', async () => {
    assert.equal((await contract.totalSupply()).toString(), '2100000000000000');
    assert.equal((await contract.decimals()).toString(), '8');
  });

  it('has a name and symbol', async () => {
    assert.equal((await contract.name()).toString(), 'Zolve Coin');
    assert.equal((await contract.symbol()).toString(), 'ZLV');
  });

  it('transfers coins between addresses', async () => {
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    assert.equal((await contract.balanceOf(accountOne)).toString(), '1');
    assert.equal((await contract.balanceOf(accountTwo)).toString(), '0');

    const amount = 1;
    await contract.transfer(accountTwo, amount, { from: accountOne });

    assert.equal((await contract.balanceOf(accountOne)).toString(), '0');
    assert.equal((await contract.balanceOf(accountTwo)).toString(), '1');
  });

  it('does not tranfer coins if sender has insufficient balance', async () => {
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    assert.equal((await contract.balanceOf(accountOne)).toString(), '1');
    assert.equal((await contract.balanceOf(accountTwo)).toString(), '0');

    const amount = 1;

    try {
      await contract.transfer(accountOne, amount, { from: accountTwo })
      throw "Oops the contract should not have transfered"
    } catch (e) {
      assert.equal((await contract.balanceOf(accountOne)).toString(), '1');
      assert.equal((await contract.balanceOf(accountTwo)).toString(), '0');
    }
  });
});
