require('should');
const Promise = require('bluebird');
const co = Promise.coroutine;

const TestV2BitGo = require('../../../lib/test_bitgo');

describe('OFC:', function() {
  let bitgo;
  let otestusdCoin;

  before(function() {
    bitgo = new TestV2BitGo({ env: 'test' });
    bitgo.initializeTestVars();
    otestusdCoin = bitgo.coin('otestusd');
  });

  it('functions that return constants', function() {
    otestusdCoin.getChain().should.equal('otestusd');
    otestusdCoin.getFullName().should.equal('Offchain Test USD');
    otestusdCoin.getBaseFactor().should.equal('100');
  });

  it('can sign payloads', co(function *() {
    const inputParams = {
      txPrebuild: {
        payload: '{"token":"otestusd"}'
      },
      prv: 'xprv9s21ZrQH143K3WG4of3nSYUC55XNFCgZTyghae9cMSFDkcKU7YJgTahJMpdTY9CjCcjgSo2TJ635uUVx176BufUMBFpieKYVJD9J3VvrGRm'
    };
    const expectedResult = {
      halfSigned: {
        payload: '{\"token\":\"otestusd\"}',
        signature: '2049b94a22c69650ad9529767da993a23c078347fdf7d887409793dce8d07190e108a846869edf387d294cd75c6c770a12847615b2553b22a61de29be5d91770dd',
      }
    }

    const signedResult = yield otestusdCoin.signTransaction(inputParams);
    signedResult.should.deepEqual(expectedResult);
  }));
});
