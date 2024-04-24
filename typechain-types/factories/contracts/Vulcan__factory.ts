/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Vulcan, VulcanInterface } from "../../contracts/Vulcan";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "projectURI_",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "softcap_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "hardcap_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime_",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "address",
        name: "creator_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "decimal_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSupply_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddress_",
        type: "address",
      },
      {
        internalType: "address",
        name: "daoAddress_",
        type: "address",
      },
      {
        internalType: "address",
        name: "lister_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "ico_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "distributor_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fundsRaised_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "daoFee_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "listerFee_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "creatorFee_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp_",
        type: "uint256",
      },
    ],
    name: "FeeDistributed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "ico_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp_",
        type: "uint256",
      },
    ],
    name: "FundsRefunded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "ico_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "investor_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contributor_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp_",
        type: "uint256",
      },
    ],
    name: "Invest",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "contributions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "contributors",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "creator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "daoAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "distribution",
    outputs: [
      {
        internalType: "bool",
        name: "distributed",
        type: "bool",
      },
      {
        internalType: "address",
        name: "distributor",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "ethdByTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "finish",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fundsRaised",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "getContributorAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContributors",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHistory",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "investor",
            type: "address",
          },
          {
            internalType: "address",
            name: "contributor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Vulcan.HISTORY[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getICOState",
    outputs: [
      {
        internalType: "enum Vulcan.ICOState",
        name: "_state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "getInvestAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInvestors",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "getTokenAmountForInvestor",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hardcap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "history",
    outputs: [
      {
        internalType: "address",
        name: "investor",
        type: "address",
      },
      {
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "contributor_",
        type: "address",
      },
    ],
    name: "invest",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "investments",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "investors",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lister",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxAmountToPurchase",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minEthAvailable",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "projectURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "refund",
    outputs: [
      {
        internalType: "bool",
        name: "refunded",
        type: "bool",
      },
      {
        internalType: "address",
        name: "refunder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "softcap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenInfo",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "decimal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensAvailable",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eth_",
        type: "uint256",
      },
    ],
    name: "tokensAvailableByEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "tokensByEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensFullyCharged",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60a0806040523462000a8357620025ff803803809162000020828562000a88565b833981016101a08282031262000a835781516001600160401b03811162000a8357816200004f91840162000ad1565b916020810151604082015191606081015193608082015160018060401b03811162000a8357816200008291840162000ad1565b60a083015190916001600160401b03821162000a8357620000a591840162000ad1565b90620000b460c0840162000b2c565b9160e0840151906101008501519261012086015190620000d8610140880162000b2c565b9a620000f7610180620000ef6101608b0162000b2c565b990162000b2c565b976001600055891562000a3e578a15620009f957898b1115620009b457428c111562000970576001600160a01b038816156200092b578615620008dc57831562000889576200015d6200014b858862000b41565b620001568962000b6b565b9062000b7a565b60408051919082018083116001600160401b039091111762000568578c620001ff60a460009493846040879601604052600e81526d169696969696969696969696969f60911b602082015260405194859263ca47c4eb60e01b602085015260606024850152620001dd835180948160848801526020888801910162000aac565b60448401526064830152601f8019910116810103608481018452018262000a88565b6020815191016a636f6e736f6c652e6c6f675afa508a6200023062000225868962000b41565b620001568a62000b6b565b1062000845576001600160a01b038d161562000800576001600160a01b0316978815620007bb576001600160a01b031680156200076c5760018060a01b031998338a600254161760025589600354161760035588600154161760015580519060018060401b038211620005685760065490600182811c9216801562000761575b6020831014620005475781601f849311620006fd575b50602090601f83116001146200067f5760009262000673575b50508160011b916000199060031b1c1916176006555b8051906001600160401b0382116200056857600a5490600182811c9216801562000668575b6020831014620005475781601f84931162000604575b50602090601f83116001146200058a576000926200057e575b50508160011b916000199060031b1c191617600a555b600c558051906001600160401b0382116200056857600b5490600182811c921680156200055d575b6020831014620005475781601f849311620004d2575b50602090601f831160011462000447576000926200043b575b50508160011b916000199060031b1c191617600b555b60018060a01b03881684600d541617600d55600f55600e5560018060a01b03169060055416176005556008556007554260045560095560018060a01b0316608052604051611a23908162000b9c82396080518181816101d40152818161035e015281816114f2015261176e0152f35b015190503880620003b6565b600b60009081527f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db99350601f198516905b818110620004b957509084600195949392106200049f575b505050811b01600b55620003cc565b015160001960f88460031b161c1916905538808062000490565b9293602060018192878601518155019501930162000478565b600b6000529091507f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db9601f840160051c810191602085106200053c575b90601f859493920160051c01905b8181106200052c57506200039d565b600081558493506001016200051d565b90915081906200050f565b634e487b7160e01b600052602260045260246000fd5b91607f169162000387565b634e487b7160e01b600052604160045260246000fd5b01519050388062000349565b600a6000908152600080516020620025bf8339815191529350601f198516905b818110620005eb5750908460019594939210620005d1575b505050811b01600a556200035f565b015160001960f88460031b161c19169055388080620005c2565b92936020600181928786015181550195019301620005aa565b600a600052909150600080516020620025bf833981519152601f840160051c810191602085106200065d575b90601f859493920160051c01905b8181106200064d575062000330565b600081558493506001016200063e565b909150819062000630565b91607f16916200031a565b015190503880620002df565b600660009081529350600080516020620025df83398151915291905b601f1984168510620006e1576001945083601f19811610620006c7575b505050811b01600655620002f5565b015160001960f88460031b161c19169055388080620006b8565b818101518355602094850194600190930192909101906200069b565b6006600052909150600080516020620025df833981519152601f840160051c8101916020851062000756575b90601f859493920160051c01905b818110620007465750620002c6565b6000815584935060010162000737565b909150819062000729565b91607f1691620002b0565b60405162461bcd60e51b815260206004820152602160248201527f496e76616c6964206c697374696e6720706172746e65722773206164647265736044820152607360f81b6064820152608490fd5b60405162461bcd60e51b815260206004820152601360248201527f496e76616c69642044414f2061646472657373000000000000000000000000006044820152606490fd5b60405162461bcd60e51b815260206004820152601560248201527f496e76616c696420544f4b454e206164647265737300000000000000000000006044820152606490fd5b606460405162461bcd60e51b815260206004820152602060248201527f4861766520746f2062652061626c6520746f20726561636820686172646361706044820152fd5b60405162461bcd60e51b815260206004820152602560248201527f546f6b656e20746f74616c537570706c79206d75737420677265617465722074604482015264068616e20360dc1b6064820152608490fd5b60405162461bcd60e51b815260206004820152602160248201527f546f6b656e20646563696d616c206d7573742067726561746572207468616e206044820152600360fc1b6064820152608490fd5b60405162461bcd60e51b815260206004820152601760248201527f496e76616c69642063726561746f7220616464726573730000000000000000006044820152606490fd5b606460405162461bcd60e51b815260206004820152602060248201527f456e642074696d652073686f756c6420626520696e20746865206675747572656044820152fd5b60405162461bcd60e51b815260206004820152601e60248201527f536f6674636170206d757374206c657373207468616e206861726463617000006044820152606490fd5b60405162461bcd60e51b815260206004820152601e60248201527f48617264636170206d7573742062652067726561746572207468616e203000006044820152606490fd5b60405162461bcd60e51b815260206004820152601e60248201527f536f6674636170206d7573742062652067726561746572207468616e203000006044820152606490fd5b600080fd5b601f909101601f19168101906001600160401b038211908210176200056857604052565b60005b83811062000ac05750506000910152565b818101518382015260200162000aaf565b81601f8201121562000a835780516001600160401b03811162000568576040519262000b08601f8301601f19166020018562000a88565b8184526020828401011162000a835762000b29916020808501910162000aac565b90565b51906001600160a01b038216820362000a8357565b8181029291811591840414171562000b5557565b634e487b7160e01b600052601160045260246000fd5b604d811162000b5557600a0a90565b811562000b85570490565b634e487b7160e01b600052601260045260246000fdfe6080604081815260049182361015610025575b505050361561002057600080fd5b600080fd5b600092833560e01c91826302d05d3f146112a9575081631069789b14611283578163164500921461125f5781631909d0d51461121b5781632131c68c146111f25781632cdc1c74146111c95781632e51846414610b565781632e659d93146111575781633197cbb6146111385781633c3610aa146111145781633cb5d100146110e95781633d103b9714610bcf5781633feb5f2b14610b8e57816342e94c9014610b56578163590e1ae314610b125781635bed7ef714610ada5781635ee58efc14610a9657816360659a921461025c5781636681b9fd14610a7757816369a72a6e14610a3a5781636addb663146108525781636e6fb49f1461075757816378e97925146107395781638da5cb5b1461071057816396b98862146106e8578163a7a38f0b14610684578163aa15efc81461056a578163ac6d7b661461052c578163af157c19146104aa578163b071cbe61461048b578163b2f5a54c146103f8578163d56b28891461026157508063e4c553101461025c578063f89be5931461023e578063f8b28422146102075763fc0c546a146101c15780610012565b34610203578160031936011261020357517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b5080fd5b50346102035760203660031901126102035760209181906001600160a01b0361022e6112ce565b1681526012845220549051908152f35b50346102035781600319360112610203576020906008549051908152f35b611330565b9050346103f457826003193601126103f45761027b611569565b6009544211156103bd5750601054600854116102a1575061029a61158c565b6001815580f35b815b60115481101561032057826102b782611315565b905460039190911b1c6001600160a01b0316808252601260205283822080549083905590811580156102f0575b505050506001016102a3565b8392839283928390610317575bf11561030c57823880806102e4565b5051903d90823e3d90fd5b506108fc6102fd565b5060607f3c0bf07453018e75735d524dc68608940318d314acf0b6f69569f251a506ad07916103826103506114d7565b6005546001600160a01b03167f0000000000000000000000000000000000000000000000000000000000000000611886565b60016016546101008260a81b033360081b1690828060a81b0319161717601655426017558051903082523360208301524290820152a161029a565b6020606492519162461bcd60e51b8352820152601260248201527124a1a7903737ba1032b73232b2103cb2ba1760711b6044820152fd5b8280fd5b82843461048857806003193601126104885781516011805480835290835260208083019492937f31ecc21a745e3968a04e9570e4425bc18fa8019c68028196b546d1669c200c6892915b82821061046857610464868661045a828b0383611385565b5191829182611406565b0390f35b83546001600160a01b031687529586019560019384019390910190610442565b80fd5b5050346102035781600319360112610203576020906007549051908152f35b82843461048857806003193601126104885781516013805480835290835260208083019492937f66de8ffda797e3de9c05e8fc57b3bf0ec28a930d40b0d285d93c06501cf6a09092915b82821061050c57610464868661045a828b0383611385565b83546001600160a01b0316875295860195600193840193909101906104f4565b828434610488576020366003190112610488575061056361055260209335600f5461144b565b61055d600e54611474565b90611482565b9051908152f35b8391503461020357816003193601126102035760185467ffffffffffffffff811161067157916020928451906105a5858260051b0183611385565b80825284820193846018855286852085915b848310610622575050505050845193808501918186525180925285850193925b8281106105e45785850386f35b835180516001600160a01b039081168752818401511686840152878101518887015260609081015190860152608090940193928101926001016105d7565b83896001928c9b98999b5161063681611353565b848060a01b038087541682528587015416838201528d60028701549082015260038601546060820152815201920192019190979594976105b7565b634e487b7160e01b835260418252602483fd5b9050346103f45760203660031901126103f457359160185483101561048857506106af6080926113e7565b5080546001820154600283015460039093015484516001600160a01b039384168152919092166020820152928301919091526060820152f35b5050346102035760203660031901126102035760209181906001600160a01b0361022e6112ce565b50503461020357816003193601126102035760025490516001600160a01b039091168152602090f35b9050346103f457826003193601126103f45760209250549051908152f35b828434610488578060031936011261048857815191816006549260018460011c9160018616958615610848575b6020968785108114610835578899509688969785829a52918260001461080e5750506001146107d0575b50505061046492916107c1910385611385565b519282849384528301906113a7565b9190869350600683528383205b8284106107f657505050820101816107c16104646107ae565b8054848a0186015288955087949093019281016107dd565b60ff19168782015293151560051b860190930193508492506107c1915061046490506107ae565b634e487b7160e01b835260228a52602483fd5b92607f1692610784565b83833461020357816003193601126102035780519180600a549460019286841c848816978815610a30575b6020988983108114610a1d5791899391899382855290816000146109ff57506001146109c2575b506108b192500386611385565b83519282600b5480831c938382169081156109b8575b8a861082146109a557508487529081156109835750600114610948575b505050936108f782610924960383611385565b600c5460018060a01b03600d541690610931600e5493600f54958751998a9960c08b5260c08b01906113a7565b91898303908a01526113a7565b948601526060850152608084015260a08301520390f35b969250600b87528287205b828810610970575050506108f782826109249782010192966108e4565b8054858901850152968301968101610953565b60ff1916868a0152505050151560051b8201850190506108f7826109246108e4565b634e487b7160e01b845260229052602483fd5b94607f16946108c7565b600a865283862086925087905b8284106109e857505050916108b19282010188926108a4565b80548b85018701528a9450928501928891016109cf565b60ff19168486015250899390151560051b83010190506108b16108a4565b634e487b7160e01b865260228552602486fd5b90607f169061087d565b505034610203578160031936011261020357602090670de0b6b3a7640000610a6f600f54610a69600e54611474565b9061144b565b049051908152f35b5050346102035781600319360112610203576020906010549051908152f35b82843461048857806003193601126104885750601454601554915160ff82161515815260089190911c6001600160a01b031660208201526040810191909152606090f35b8284346104885760203660031901126104885750610563610b09602093610b02600e54611474565b903561144b565b600f5490611482565b82843461048857806003193601126104885750601654601754915160ff82161515815260089190911c6001600160a01b031660208201526040810191909152606090f35b5050346102035760203660031901126102035760209181906001600160a01b03610b7e6112ce565b1681526019845220549051908152f35b9050346103f45760203660031901126103f45735916011548310156104885750610bb9602092611315565b905491519160018060a01b039160031b1c168152f35b9050816003193601126103f4578035906001600160a01b03602480358281169392908490036110e557610c00611569565b610c086114d7565b610c15600f54918261144b565b90610c26600e549261055d84611474565b6007541161109357610c5890610c53610c3d6114d7565b93610a69610c4d6010548c6114ca565b91611474565b611482565b1161104657600954421015611015578415610fe257843410610fa6578315610f64573387526012602052858720610c908682546114ca565b905560115487805b828110610f39575015610f05575b508387526019602052858720610cbd8682546114ca565b905560135487805b828110610edb575015610e95575b50843403348111610e83578790863414908115610e53575b505050855190610cfa82611353565b33825260208201858152878301908782526060840192428452601854600160401b811015610e4157806001610d3292016018556113e7565b959095610e30575185546001600160a01b0319908116918316919091178655915160018601805490931691161790555160028301555160039190910155601054610d7d9085906114ca565b806010556007541115610dd4575b857f842768b94b018e5aa48731ee69f4550eb378c75290e54507b23e4272ef1ed4c960a08787878251923084523360208501528301526060820152426080820152a16001815580f35b600019420191428311610e1f575050917f842768b94b018e5aa48731ee69f4550eb378c75290e54507b23e4272ef1ed4c9939160a093600955610e1561158c565b9193819350610d8b565b634e487b7160e01b87526011905285fd5b634e487b7160e01b8c528b8852868cfd5b634e487b7160e01b8c5260418852868cfd5b8280929181928290610e7a575b3390f115610e7057863880610ceb565b85513d88823e3d90fd5b506108fc610e60565b634e487b7160e01b8852601184528288fd5b600160401b811015610ec957806001610eb192016013556112e4565b81549060031b908387831b921b191617905538610cd3565b634e487b7160e01b8852604184528288fd5b8684610ee6836112e4565b90549060031b1c1614610efc575b600101610cc5565b60019150610ef4565b600160401b811015610ec957806001610f219201601155611315565b81549060031b908333831b921b191617905538610ca6565b83610f4382611315565b919054339260031b1c1614610f5b575b600101610c98565b60019150610f53565b855162461bcd60e51b8152602081850152601d818401527f496e76616c696420636f6e7472696275746f72277320616464726573730000006044820152606490fd5b855162461bcd60e51b815260208185015260178184015276125b9cdd59999a58da595b9d08115d1a08185b5bdd5b9d604a1b6044820152606490fd5b855162461bcd60e51b8152602081850152600e818401526d125b9d985b1a5908185b5bdd5b9d60921b6044820152606490fd5b855162461bcd60e51b8152602081850152600c818401526b1250d3c81a5cc8195b99195960a21b6044820152606490fd5b855162461bcd60e51b81526020818501526022818401527f496e73756666696369656e7420707572636861736520746f6b656e20616d6f756044820152611b9d60f21b6064820152608490fd5b875162461bcd60e51b81526020818701526027818601527f546f6b656e73206861766520746f20626520636861726765642066756c6c7920604482015266666f722049434f60c81b6064820152608490fd5b8680fd5b9050346103f45760203660031901126103f45735916013548310156104885750610bb96020926112e4565b8284346104885760203660031901126104885750610563602092600f549035611482565b5050346102035781600319360112610203576020906009549051908152f35b83833461020357816003193601126102035760095442101561119b5781905b51918382101561118857602083838152f35b634e487b7160e01b815260218452602490fd5b60105460075481106111b05750600390611176565b60085411156111c157600190611176565b600290611176565b50503461020357816003193601126102035760015490516001600160a01b039091168152602090f35b50503461020357816003193601126102035760035490516001600160a01b039091168152602090f35b5050346102035760203660031901126102035760209161056390610b099083906001600160a01b0361124b6112ce565b168152601286522054610a69600e54611474565b505034610203578160031936011261020357602090610563600754600f5490611482565b5050346102035781600319360112610203576020906112a06114a2565b90519015158152f35b8490346102035781600319360112610203576005546001600160a01b03168152602090f35b600435906001600160a01b038216820361002057565b6013548110156112ff57601360005260206000200190600090565b634e487b7160e01b600052603260045260246000fd5b6011548110156112ff57601160005260206000200190600090565b3461002057600036600319011261002057602061134b6114d7565b604051908152f35b6080810190811067ffffffffffffffff82111761136f57604052565b634e487b7160e01b600052604160045260246000fd5b90601f8019910116810190811067ffffffffffffffff82111761136f57604052565b919082519283825260005b8481106113d3575050826000602080949584010152601f8019910116010190565b6020818301810151848301820152016113b2565b6018548110156112ff57601860005260206000209060021b0190600090565b602090602060408183019282815285518094520193019160005b82811061142e575050505090565b83516001600160a01b031685529381019392810192600101611420565b8181029291811591840414171561145e57565b634e487b7160e01b600052601160045260246000fd5b604d811161145e57600a0a90565b811561148c570490565b634e487b7160e01b600052601260045260246000fd5b6114b86105526114b06114d7565b600f5461144b565b600754116114c557600190565b600090565b9190820180921161145e57565b6040516370a0823160e01b81523060048201526020816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa90811561155d5760009161152e575090565b90506020813d602011611555575b8161154960209383611385565b81010312610020575190565b3d915061153c565b6040513d6000823e3d90fd5b60026000541461157a576002600055565b604051633ee5aeb560e01b8152600490fd5b6040516040810181811067ffffffffffffffff82111761136f576040526012815260209071191a5cdd1c9a589d5d1948185c9c9a5d995960721b828201526000806040518481019063104c13eb60e21b8252611606816115f860249789602484015260448301906113a7565b03601f198101835282611385565b51906a636f6e736f6c652e6c6f675afa50601054926019906019850285159580820460191487171561145e57600080808060018060a01b036003541681906103e888041561187c575b6103e8880491f11561155d57600a810296818804600a1481171561145e57600080808060018060a01b036001541681908d6103e8810415611872575b6103e8900491f11561155d57605f820290828204605f14171561145e57600080808060018060a01b036005541681906064870415611868575b6064870491f11561155d5760005b601354811015611767576116e5816112e4565b905460039190911b1c6001600160a01b03166000818152878a52604090205480158015611718575b5050506001016116d2565b600f8083029283041417156117525760008080936103e882940490828215611749575bf11561155d5738808061170d565b506108fc61173b565b88634e487b7160e01b60005260116004526000fd5b50929690957f0000000000000000000000000000000000000000000000000000000000000000955093509060005b6011548110156117e857806117e26117ae600193611315565b848060a01b0391549060031b1c1680600052601288526117db610b09604060002054610a69600e54611474565b9089611886565b01611795565b5060e09450606492916103e880927f8685f6684f1a26e02f6d97f68ab629b105865a82a09efb8d0a47293918edd3a89860016014546101008260a81b033360081b1690828060a81b03191617176014554260155560405197308952339089015260408801520460608601520460808401520460a08201524260c0820152a1565b6108fc91506116c4565b6108fc925061168b565b6108fc915061164f565b60405163a9059cbb60e01b602082019081526001600160a01b0393841660248301526044808301959095529381529291906118c084611353565b1691600080928192519082865af13d1561197e573d9067ffffffffffffffff821161196a579061191291604051916119026020601f19601f8401160184611385565b82523d84602084013e5b8461198a565b908151918215159283611942575b50505061192a5750565b60249060405190635274afe760e01b82526004820152fd5b8192935090602091810103126102035760200151908115918215036104885750388080611920565b634e487b7160e01b83526041600452602483fd5b6119129060609061190c565b906119b1575080511561199f57805190602001fd5b604051630a12f52160e11b8152600490fd5b815115806119e4575b6119c2575090565b604051639996b31560e01b81526001600160a01b039091166004820152602490fd5b50803b156119ba56fea2646970667358221220c9ddcfe9d07cf0c98640b42e246b38d1f8898678bf948c001f587168159ec80b64736f6c63430008180033c65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a8f652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f";

type VulcanConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VulcanConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Vulcan__factory extends ContractFactory {
  constructor(...args: VulcanConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    projectURI_: string,
    softcap_: BigNumberish,
    hardcap_: BigNumberish,
    endTime_: BigNumberish,
    name_: string,
    symbol_: string,
    creator_: AddressLike,
    price_: BigNumberish,
    decimal_: BigNumberish,
    totalSupply_: BigNumberish,
    tokenAddress_: AddressLike,
    daoAddress_: AddressLike,
    lister_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      projectURI_,
      softcap_,
      hardcap_,
      endTime_,
      name_,
      symbol_,
      creator_,
      price_,
      decimal_,
      totalSupply_,
      tokenAddress_,
      daoAddress_,
      lister_,
      overrides || {}
    );
  }
  override deploy(
    projectURI_: string,
    softcap_: BigNumberish,
    hardcap_: BigNumberish,
    endTime_: BigNumberish,
    name_: string,
    symbol_: string,
    creator_: AddressLike,
    price_: BigNumberish,
    decimal_: BigNumberish,
    totalSupply_: BigNumberish,
    tokenAddress_: AddressLike,
    daoAddress_: AddressLike,
    lister_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      projectURI_,
      softcap_,
      hardcap_,
      endTime_,
      name_,
      symbol_,
      creator_,
      price_,
      decimal_,
      totalSupply_,
      tokenAddress_,
      daoAddress_,
      lister_,
      overrides || {}
    ) as Promise<
      Vulcan & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Vulcan__factory {
    return super.connect(runner) as Vulcan__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VulcanInterface {
    return new Interface(_abi) as VulcanInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Vulcan {
    return new Contract(address, _abi, runner) as unknown as Vulcan;
  }
}
