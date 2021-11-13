"use strict";

App = {
  web3Provider: null,
  contracts: {
    DDNService: null
  },
  currentAddress: '',
  contractAddress: '0x85D725532fBC970adA75d93b6942Ca76A0CcfDf2',
  contractAbi: [{
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
  }, {
    "inputs": [{
      "internalType": "bytes32",
      "name": "key",
      "type": "bytes32"
    }],
    "name": "getDomain",
    "outputs": [{
      "internalType": "string",
      "name": "domain",
      "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "bytes",
      "name": "signature",
      "type": "bytes"
    }],
    "name": "getUserKeys",
    "outputs": [{
      "internalType": "bytes32[]",
      "name": "keys",
      "type": "bytes32[]"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "string",
      "name": "domain",
      "type": "string"
    }],
    "name": "register",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }],
  initWeb3: function initWeb3() {
    return regeneratorRuntime.async(function initWeb3$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!window.ethereum) {
              _context.next = 12;
              break;
            }

            App.web3Provider = window.ethereum;
            web3 = new Web3(App.web3Provider);
            _context.prev = 3;
            _context.next = 6;
            return regeneratorRuntime.awrap(ethereum.enable());

          case 6:
            _context.next = 10;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](3);

          case 10:
            _context.next = 13;
            break;

          case 12:
            if (window.web3) {
              App.web3Provider = web3.currentProvider;
              web3 = new Web3(App.web3Provider);
            } else {
              App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
              web3 = new Web3(App.web3Provider);
            }

          case 13:
            web3.eth.getAccounts(function (err, accounts) {
              if (err) {
                return;
              }

              App.currentAddress = accounts[0];
              return App.initContract();
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 8]]);
  },
  initContract: function initContract() {
    App.contracts.DDNService = new web3.eth.Contract(App.contractAbi, App.contractAddress);
    return App.bindEvents();
  },
  bindEvents: function bindEvents() {
    $(document).on('change', '#select', App.selectFunction);
  },
  selectFunction: function selectFunction() {
    var index = $('#select').val();
    var functionAbi = App.contractAbi[index];
    $('#' + functionAbi.name + 'Box').show().siblings().hide();
  },
  register: function register() {
    var domain, data;
    return regeneratorRuntime.async(function register$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            domain = $('#domain').val();

            if (domain) {
              _context2.next = 4;
              break;
            }

            layer.open({
              content: "Please fill in the domain name",
              skin: 'msg',
              time: 2 //2秒后自动关闭

            });
            return _context2.abrupt("return");

          case 4:
            _context2.next = 6;
            return regeneratorRuntime.awrap(App.contracts.DDNService.methods.register(domain).send({
              from: App.currentAddress
            }));

          case 6:
            data = _context2.sent;

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  getDomain: function getDomain() {
    var key, data;
    return regeneratorRuntime.async(function getDomain$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            key = $('#key').val();

            if (key) {
              _context3.next = 4;
              break;
            }

            layer.open({
              content: "Please fill in the key",
              skin: 'msg',
              time: 2 //2秒后自动关闭

            });
            return _context3.abrupt("return");

          case 4:
            _context3.next = 6;
            return regeneratorRuntime.awrap(App.contracts.DDNService.methods.getDomain(key).call({
              from: App.currentAddress
            }));

          case 6:
            data = _context3.sent;
            $('#resultDomain').text(data);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  getDomainList: function getDomainList() {
    var hash, signature, data, tr, table;
    return regeneratorRuntime.async(function getDomainList$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(App.currentAddress);
            hash = web3.utils.soliditySha3(App.currentAddress).toString("hex");
            console.log(hash);
            _context4.next = 5;
            return regeneratorRuntime.awrap(web3.eth.personal.sign(hash, App.currentAddress));

          case 5:
            signature = _context4.sent;
            _context4.next = 8;
            return regeneratorRuntime.awrap(App.contracts.DDNService.methods.getUserKeys(signature).call({
              from: App.currentAddress
            }));

          case 8:
            data = _context4.sent;
            console.log(data);
            tr = '';
            data.forEach(function (item, index) {
              tr += " <tr>\n        <th scope=\"row\">".concat(index + 1, "</th>\n        <td id=\"item").concat(index, "\">").concat(item, "</td>\n        <td><button style=\"width:72px\" type=\"button\" class=\"btn btn-primary js-copy\" data-clipboard-action=\"copy\" data-clipboard-target=\"#item").concat(index, "\">copy</button></td>\n      </tr>");
            });
            table = "  <table class=\"table\">\n      <tbody>\n        ".concat(tr, "\n      </tbody>\n    </table>");
            $('#resultKey').html(table);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    });
  }
};

(function () {
  var clipboard = new ClipboardJS('.js-copy');
  clipboard.on('success', function (e) {
    layer.open({
      content: "copy success",
      skin: 'msg',
      time: 2 //2秒后自动关闭

    });
  });
  clipboard.on('error', function (e) {
    layer.open({
      content: "copy faild",
      skin: 'msg',
      time: 2
    });
  });
  App.initWeb3();
})();