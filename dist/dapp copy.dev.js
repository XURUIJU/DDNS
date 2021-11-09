"use strict";

App = {
  web3Provider: null,
  contracts: {
    grantContract: null
  },
  currentAddress: '',
  grantAddress: '0xF08CCFb915F8c07393bb6fcB13ECBcE10d7FF497',
  grantAbi: [{
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "intro",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "time",
      "type": "uint256"
    }],
    "name": "BindIntroLogs",
    "type": "event"
  }, {
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
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "RewardPaid",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "recordId",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "time",
      "type": "uint256"
    }],
    "name": "RewardPaidRecord",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "productId",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "address",
      "name": "mainToken",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "address",
      "name": "deputyToken",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "mainTokenAmount",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "deputyTokenAmount",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "power",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "time",
      "type": "uint256"
    }],
    "name": "StakedRecord",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "level",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "time",
      "type": "uint256"
    }],
    "name": "UpgradeLevelLog",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "productId",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "address",
      "name": "mainToken",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "address",
      "name": "deputyToken",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "mainTokenAmount",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "deputyTokenAmount",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "power",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "fee",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "time",
      "type": "uint256"
    }],
    "name": "withdrawRecordLog",
    "type": "event"
  }, {
    "inputs": [],
    "name": "USDT",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "WBNB",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "YFI9",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_productId",
      "type": "uint256"
    }, {
      "internalType": "address",
      "name": "_mainToken",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "_deputyToken",
      "type": "address"
    }],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_rateTypeId",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_mainRate",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_power",
      "type": "uint256"
    }],
    "name": "addRateType",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_intro",
      "type": "address"
    }],
    "name": "bindIntro",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "name": "children",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_productId",
      "type": "uint256"
    }],
    "name": "deleteProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_rateTypeId",
      "type": "uint256"
    }],
    "name": "deleteRateType",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "earned",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "eightRate",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "fifteenRate",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "getAllProductStruct",
    "outputs": [{
      "components": [{
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "mainToken",
        "type": "address"
      }, {
        "internalType": "address",
        "name": "deputyToken",
        "type": "address"
      }, {
        "internalType": "string",
        "name": "mainTokenSympol",
        "type": "string"
      }, {
        "internalType": "string",
        "name": "deputyTokenSympol",
        "type": "string"
      }],
      "internalType": "struct YfiStake.Product[]",
      "name": "productArr",
      "type": "tuple[]"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "getAllRateTypeStruct",
    "outputs": [{
      "components": [{
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "mainRate",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "deputyRate",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "power",
        "type": "uint256"
      }],
      "internalType": "struct YfiStake.RateType[]",
      "name": "rateTypeArr",
      "type": "tuple[]"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_mainToken",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_power",
      "type": "uint256"
    }],
    "name": "getApr",
    "outputs": [{
      "internalType": "uint256",
      "name": "apr",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_user",
      "type": "address"
    }],
    "name": "getChildren",
    "outputs": [{
      "internalType": "address[]",
      "name": "child",
      "type": "address[]"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }],
    "name": "getETH",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "mainToken",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "deputyToken",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_deputyRate",
      "type": "uint256"
    }],
    "name": "getNeedAmount",
    "outputs": [{
      "internalType": "uint256",
      "name": "tokenAmount",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_productId",
      "type": "uint256"
    }],
    "name": "getProduct",
    "outputs": [{
      "components": [{
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "mainToken",
        "type": "address"
      }, {
        "internalType": "address",
        "name": "deputyToken",
        "type": "address"
      }, {
        "internalType": "string",
        "name": "mainTokenSympol",
        "type": "string"
      }, {
        "internalType": "string",
        "name": "deputyTokenSympol",
        "type": "string"
      }],
      "internalType": "struct YfiStake.Product",
      "name": "product",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_rate",
      "type": "uint256"
    }],
    "name": "getRateAmount",
    "outputs": [{
      "internalType": "uint256",
      "name": "rateNum",
      "type": "uint256"
    }],
    "stateMutability": "pure",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_rateType",
      "type": "uint256"
    }],
    "name": "getRateType",
    "outputs": [{
      "components": [{
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "mainRate",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "deputyRate",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "power",
        "type": "uint256"
      }],
      "internalType": "struct YfiStake.RateType",
      "name": "rateType",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_productId",
      "type": "uint256"
    }],
    "name": "getRecord",
    "outputs": [{
      "components": [{
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "investor",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "mainTokenAmount",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "deputyTokenAmount",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "stakeType",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "rateType",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "power",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      }],
      "internalType": "struct YfiStake.Record",
      "name": "record",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "getReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_lastRewardTime",
      "type": "uint256"
    }],
    "name": "getTimeReward",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_token",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }],
    "name": "getToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "halvingPeriod",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
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
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "introPower",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "introRate",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "intros",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_user",
      "type": "address"
    }],
    "name": "isActive",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "lastUpdateTime",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "oneRate",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
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
    "inputs": [],
    "name": "periodTime",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "blockTime",
      "type": "uint256"
    }],
    "name": "phase",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "receiveAddress",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "blockTime",
      "type": "uint256"
    }],
    "name": "reward",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "rewardPerTime",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "rewardPerToken",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "rewardPerTokenStored",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "rewards",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "rewardsToken",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "rootAddress",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "routerPath",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_eightRate",
      "type": "uint256"
    }],
    "name": "setEightRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_fifteenRate",
      "type": "uint256"
    }],
    "name": "setFifteenRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_halvingPeriod",
      "type": "uint256"
    }],
    "name": "setHalvingPeriod",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_oneRate",
      "type": "uint256"
    }],
    "name": "setOneRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_periodTime",
      "type": "uint256"
    }],
    "name": "setPeriodTime",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_receiveAddress",
      "type": "address"
    }],
    "name": "setReceiveAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_rewardPerTime",
      "type": "uint256"
    }],
    "name": "setRewardPerTime",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_rewardsToken",
      "type": "address"
    }],
    "name": "setRewardsToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_routerPath",
      "type": "address"
    }],
    "name": "setRouterPath",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_startTime",
      "type": "uint256"
    }],
    "name": "setStartTime",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_usdt",
      "type": "address"
    }],
    "name": "setUsdt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_bnb",
      "type": "address"
    }],
    "name": "setWbnb",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_yfi9",
      "type": "address"
    }],
    "name": "setYfi9",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_zeroRate",
      "type": "uint256"
    }],
    "name": "setZeroRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_productId",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_rateType",
      "type": "uint256"
    }],
    "name": "stake",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "startTime",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
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
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "userRewardPerTokenPaid",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_productId",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_rate",
      "type": "uint256"
    }],
    "name": "withdrawRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "zeroRate",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
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
    App.contracts.grantContract = new web3.eth.Contract(App.grantAbi, App.grantAddress);
    App.getProduct();
    App.getRateType();
    App.getAllProduct2();
    App.getAllRateType2();
    App.getNeedAmount(); // App.getRouterPath()

    App.getRecord();
  },
  changeFunction: function changeFunction() {
    var index = $('#select').val();
    var functionAbi = App.contractAbi[index];
    var str = '';
    var inputStr = '';
    functionAbi.inputs.forEach(function (item) {
      inputStr += "<div class=\"mb-3\">\n        <label for=\"".concat(item.name, "\" class=\"form-label\">").concat(item.name, "</label>\n        <input type=\"").concat(item.type == 'uint256' ? 'number' : 'text', "\" class=\"form-control\" id=\"").concat(item.name, "\" placeholder=\"").concat(item.type, "\" aria-describedby=\"emailHelp\">\n      </div>\n      ");

      if (functionAbi.stateMutability == 'payable') {
        inputStr += "<div class=\"mb-3\">\n        <label for=\"ethValue\" class=\"form-label\">Eth value</label>\n        <input type=\"number\" class=\"form-control\" id=\"ethValue\" placeholder=\"uint256\" aria-describedby=\"emailHelp\">\n      </div>\n      ";
      }
    });
    str += "\n      ".concat(inputStr, "\n      <div class=\"d-grid gap-2\">\n       <button class=\"btn btn-primary\" onclick=\"App.").concat(functionAbi.name, "\" type=\"button\">").concat(functionAbi.name, "</button>\n     </div>\n     ");
    $('#functionContent').html(str);
  },
  getRouterPath: function getRouterPath() {
    var data;
    return regeneratorRuntime.async(function getRouterPath$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(App.contracts.path.methods.getPath('0xbA2aE424d960c26247Dd6c32edC70B295c744C43', '0x55d398326f99059fF775485246999027B3197955').call());

          case 2:
            data = _context2.sent;
            console.log(data, 'data------------');

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  setTotalPower: function setTotalPower() {
    return regeneratorRuntime.async(function setTotalPower$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.setWbnb('0x1e33833a035069f42d68D1F53b341643De1C018D').send({
              from: App.currentAddress
            }));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  getETH: function getETH() {
    return regeneratorRuntime.async(function getETH$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.getETH('30000000000000000').send({
              from: App.currentAddress
            }));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  addProduct: function addProduct() {
    return regeneratorRuntime.async(function addProduct$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.addProduct('3', '0x261828B6e70bf05136DA9D0c8BC0FffdEeCF0aE3', '0x0000000000000000000000000000000000000000').send({
              from: App.currentAddress
            }));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  addRateType: function addRateType() {
    return regeneratorRuntime.async(function addRateType$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.addRateType('2', '10000', '1000000000000000000').send({
              from: App.currentAddress
            }));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  getProduct: function getProduct() {
    var data;
    return regeneratorRuntime.async(function getProduct$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.getProduct('1').call({
              from: App.currentAddress
            }));

          case 2:
            data = _context7.sent;
            console.log(data);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    });
  },
  getRateType: function getRateType() {
    var data;
    return regeneratorRuntime.async(function getRateType$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.getRateType('3').call({
              from: App.currentAddress
            }));

          case 2:
            data = _context8.sent;
            console.log(data);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    });
  },
  getAllProduct: function getAllProduct() {
    var data;
    return regeneratorRuntime.async(function getAllProduct$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.getAllProduct().call({
              from: App.currentAddress
            }));

          case 2:
            data = _context9.sent;
            console.log(data);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    });
  },
  getAllRateType: function getAllRateType() {
    var data;
    return regeneratorRuntime.async(function getAllRateType$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.getAllRateType().call({
              from: App.currentAddress
            }));

          case 2:
            data = _context10.sent;
            console.log(data);

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    });
  },
  getAllProduct2: function getAllProduct2() {
    var data;
    return regeneratorRuntime.async(function getAllProduct2$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.getAllProductStruct().call({
              from: App.currentAddress
            }));

          case 2:
            data = _context11.sent;
            console.log(data);

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    });
  },
  getAllRateType2: function getAllRateType2() {
    var data;
    return regeneratorRuntime.async(function getAllRateType2$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.getAllRateTypeStruct().call({
              from: App.currentAddress
            }));

          case 2:
            data = _context12.sent;
            console.log(data);

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    });
  },
  addRecord: function addRecord() {
    return regeneratorRuntime.async(function addRecord$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.stakeRecord('100000000000000000', '1', '1').send({
              from: App.currentAddress,
              value: '80000000000000000'
            }));

          case 2:
          case "end":
            return _context13.stop();
        }
      }
    });
  },
  getRecord: function getRecord() {
    var data;
    return regeneratorRuntime.async(function getRecord$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.getRecord('2').call());

          case 2:
            data = _context14.sent;
            console.log(data, 'getRecord--------');

          case 4:
          case "end":
            return _context14.stop();
        }
      }
    });
  },
  setIntro: function setIntro() {
    return regeneratorRuntime.async(function setIntro$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.setHalvingPeriod('5184000').send({
              from: App.currentAddress
            }));

          case 2:
          case "end":
            return _context15.stop();
        }
      }
    });
  },
  setPeriodTime: function setPeriodTime() {
    return regeneratorRuntime.async(function setPeriodTime$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.setPeriodTime('1800').send({
              from: App.currentAddress
            }));

          case 2:
          case "end":
            return _context16.stop();
        }
      }
    });
  },
  setRewardPerTime: function setRewardPerTime() {
    return regeneratorRuntime.async(function setRewardPerTime$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.setRewardPerTime('1612800000000000000').send({
              from: App.currentAddress
            }));

          case 2:
          case "end":
            return _context17.stop();
        }
      }
    });
  },
  getNeedAmount: function getNeedAmount() {
    var data;
    return regeneratorRuntime.async(function getNeedAmount$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.getNeedAmount('0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf', '0x55d398326f99059fF775485246999027B3197955', '1000000000000000000', '10000').call());

          case 2:
            data = _context18.sent;
            console.log(data, 'getNeedAmount --------------');

          case 4:
          case "end":
            return _context18.stop();
        }
      }
    });
  },
  deleteRateType: function deleteRateType() {
    return regeneratorRuntime.async(function deleteRateType$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.deleteRateType('4').send({
              from: App.currentAddress
            }));

          case 2:
          case "end":
            return _context19.stop();
        }
      }
    });
  },
  deleteProduct: function deleteProduct() {
    return regeneratorRuntime.async(function deleteProduct$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return regeneratorRuntime.awrap(App.contracts.grantContract.methods.deleteProduct('15').send({
              from: App.currentAddress
            }));

          case 2:
          case "end":
            return _context20.stop();
        }
      }
    });
  }
};

(function () {
  App.initWeb3();
})();