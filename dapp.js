
App = {
    web3Provider: null,
    contracts: {
      DDNService: null
    },
    currentAddress: '',
    contractAddress: '0x85D725532fBC970adA75d93b6942Ca76A0CcfDf2',
    contractAbi:[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"}],"name":"getDomain","outputs":[{"internalType":"string","name":"domain","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"getUserKeys","outputs":[{"internalType":"bytes32[]","name":"keys","type":"bytes32[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"domain","type":"string"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}],
    initWeb3: async function () {
      if (window.ethereum) {
        App.web3Provider = window.ethereum
        web3 = new Web3(App.web3Provider);
        try {
          // await App.changeNetwork()
          await ethereum.enable()
        } catch (error) {
        }
      } else {
        if (window.web3) {
          App.web3Provider = web3.currentProvider
          web3 = new Web3(App.web3Provider);
        } else {
          App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
          web3 = new Web3(App.web3Provider);
        }
      }
      web3.eth.getAccounts((err, accounts) => {
        if (err) {
          return
        }
        App.currentAddress = accounts[0]
        return App.initContract();
      });
    },
    initContract: function () {
      App.contracts.DDNService = new web3.eth.Contract(App.contractAbi, App.contractAddress);
      return App.bindEvents();
    },
    bindEvents: function () {
      $(document).on('change', '#select', App.selectFunction);
    },
    selectFunction: function () {
      let index = $('#select').val()
      let functionAbi = App.contractAbi[index]
      $('#' +functionAbi.name + 'Box').show().siblings().hide()

    },
    register:async function (){
      let domain = $('#domain').val()
      if(!domain) {
        layer.open({
          content: "Please fill in the domain name",
          skin: 'msg',
          time: 2 //2秒后自动关闭
        });
        return
      }
      let data = await App.contracts.DDNService.methods.register(domain).send({from:App.currentAddress})
    },
    getDomain :async function (){
      let key = $('#key').val()
      if(!key) {
        layer.open({
          content: "Please fill in the key",
          skin: 'msg',
          time: 2 //2秒后自动关闭
        });
        return
      }
      let data = await App.contracts.DDNService.methods.getDomain(key).call({from:App.currentAddress})
      $('#resultDomain').text(data)
    },
    getDomainList:async function (){
      console.log( App.currentAddress)
      var hash = web3.utils.soliditySha3(App.currentAddress).toString("hex");
      console.log(hash)
      let signature = await web3.eth.personal.sign(hash, App.currentAddress)
      let data = await App.contracts.DDNService.methods.getUserKeys(signature).call({from:App.currentAddress})
      console.log(data)
      let tr = ''
      data.forEach((item, index) => {
        tr += ` <tr>
        <th scope="row">${index+1}</th>
        <td id="item${index}">${item}</td>
        <td><button style="width:72px" type="button" class="btn btn-primary js-copy" data-clipboard-action="copy" data-clipboard-target="#item${index}">copy</button></td>
      </tr>`
      });
      let table = `  <table class="table">
      <tbody>
        ${tr}
      </tbody>
    </table>`
      $('#resultKey').html(table)
    },       
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
  
  
