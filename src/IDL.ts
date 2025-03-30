export type PumpFun = {
  version: "0.1.0"
  name: "pump_fun"
  instructions: [
    {
      name: "initialize"
      accounts: [
        {
          name: "global"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: "feeRecipient"
          type: "publicKey"
        },
        {
          name: "initialVirtualTokenReserves"
          type: "u64"
        },
        {
          name: "initialVirtualSolReserves"
          type: "u64"
        },
        {
          name: "initialRealTokenReserves"
          type: "u64"
        },
        {
          name: "tokenTotalSupply"
          type: "u64"
        },
        {
          name: "feeBasisPoints"
          type: "u64"
        },
      ]
    },
    {
      name: "create"
      accounts: [
        {
          name: "mint"
          isMut: true
          isSigner: true
        },
        {
          name: "associatedBondingCurve"
          isMut: true
          isSigner: false
        },
        {
          name: "metadata"
          isMut: true
          isSigner: false
        },
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "global"
          isMut: false
          isSigner: false
        },
        {
          name: "bondingCurve"
          isMut: true
          isSigner: false
        },
        {
          name: "mintAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "metadataProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: "name"
          type: "string"
        },
        {
          name: "symbol"
          type: "string"
        },
        {
          name: "uri"
          type: "string"
        },
      ]
    },
    {
      name: "buy"
      accounts: [
        {
          name: "feeRecipient"
          isMut: true
          isSigner: false
        },
        {
          name: "mint"
          isMut: true
          isSigner: false
        },
        {
          name: "associatedBondingCurve"
          isMut: true
          isSigner: false
        },
        {
          name: "associatedUser"
          isMut: true
          isSigner: false
        },
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "bondingCurve"
          isMut: true
          isSigner: false
        },
        {
          name: "mintAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: "amount"
          type: "u64"
        },
        {
          name: "solAmount"
          type: "u64"
        },
      ]
    },
    {
      name: "sell"
      accounts: [
        {
          name: "feeRecipient"
          isMut: true
          isSigner: false
        },
        {
          name: "mint"
          isMut: true
          isSigner: false
        },
        {
          name: "associatedBondingCurve"
          isMut: true
          isSigner: false
        },
        {
          name: "associatedUser"
          isMut: true
          isSigner: false
        },
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "bondingCurve"
          isMut: true
          isSigner: false
        },
        {
          name: "mintAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: "amount"
          type: "u64"
        },
        {
          name: "minSolOutput"
          type: "u64"
        },
      ]
    },
    {
      name: "complete"
      accounts: [
        {
          name: "mint"
          isMut: true
          isSigner: false
        },
        {
          name: "associatedBondingCurve"
          isMut: true
          isSigner: false
        },
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "bondingCurve"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: "setParams"
      accounts: [
        {
          name: "global"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
      ]
      args: [
        {
          name: "feeRecipient"
          type: "publicKey"
        },
        {
          name: "initialVirtualTokenReserves"
          type: "u64"
        },
        {
          name: "initialVirtualSolReserves"
          type: "u64"
        },
        {
          name: "initialRealTokenReserves"
          type: "u64"
        },
        {
          name: "tokenTotalSupply"
          type: "u64"
        },
        {
          name: "feeBasisPoints"
          type: "u64"
        },
      ]
    },
  ]
  accounts: [
    {
      name: "bondingCurve"
      type: {
        kind: "struct"
        fields: [
          {
            name: "discriminator"
            type: "u64"
          },
          {
            name: "virtualTokenReserves"
            type: "u64"
          },
          {
            name: "virtualSolReserves"
            type: "u64"
          },
          {
            name: "realTokenReserves"
            type: "u64"
          },
          {
            name: "realSolReserves"
            type: "u64"
          },
          {
            name: "tokenTotalSupply"
            type: "u64"
          },
          {
            name: "complete"
            type: "bool"
          },
        ]
      }
    },
    {
      name: "global"
      type: {
        kind: "struct"
        fields: [
          {
            name: "discriminator"
            type: "u64"
          },
          {
            name: "initialized"
            type: "bool"
          },
          {
            name: "authority"
            type: "publicKey"
          },
          {
            name: "feeRecipient"
            type: "publicKey"
          },
          {
            name: "initialVirtualTokenReserves"
            type: "u64"
          },
          {
            name: "initialVirtualSolReserves"
            type: "u64"
          },
          {
            name: "initialRealTokenReserves"
            type: "u64"
          },
          {
            name: "tokenTotalSupply"
            type: "u64"
          },
          {
            name: "feeBasisPoints"
            type: "u64"
          },
        ]
      }
    },
  ]
  events: [
    {
      name: "CreateEvent"
      fields: [
        {
          name: "name"
          type: "string"
          index: false
        },
        {
          name: "symbol"
          type: "string"
          index: false
        },
        {
          name: "uri"
          type: "string"
          index: false
        },
        {
          name: "mint"
          type: "publicKey"
          index: true
        },
        {
          name: "bondingCurve"
          type: "publicKey"
          index: false
        },
        {
          name: "user"
          type: "publicKey"
          index: true
        },
      ]
    },
    {
      name: "TradeEvent"
      fields: [
        {
          name: "mint"
          type: "publicKey"
          index: true
        },
        {
          name: "solAmount"
          type: "u64"
          index: false
        },
        {
          name: "tokenAmount"
          type: "u64"
          index: false
        },
        {
          name: "isBuy"
          type: "bool"
          index: false
        },
        {
          name: "user"
          type: "publicKey"
          index: true
        },
        {
          name: "timestamp"
          type: "i64"
          index: false
        },
        {
          name: "virtualSolReserves"
          type: "u64"
          index: false
        },
        {
          name: "virtualTokenReserves"
          type: "u64"
          index: false
        },
        {
          name: "realSolReserves"
          type: "u64"
          index: false
        },
        {
          name: "realTokenReserves"
          type: "u64"
          index: false
        },
      ]
    },
    {
      name: "CompleteEvent"
      fields: [
        {
          name: "user"
          type: "publicKey"
          index: true
        },
        {
          name: "mint"
          type: "publicKey"
          index: true
        },
        {
          name: "bondingCurve"
          type: "publicKey"
          index: false
        },
        {
          name: "timestamp"
          type: "i64"
          index: false
        },
      ]
    },
    {
      name: "SetParamsEvent"
      fields: [
        {
          name: "feeRecipient"
          type: "publicKey"
          index: false
        },
        {
          name: "initialVirtualTokenReserves"
          type: "u64"
          index: false
        },
        {
          name: "initialVirtualSolReserves"
          type: "u64"
          index: false
        },
        {
          name: "initialRealTokenReserves"
          type: "u64"
          index: false
        },
        {
          name: "tokenTotalSupply"
          type: "u64"
          index: false
        },
        {
          name: "feeBasisPoints"
          type: "u64"
          index: false
        },
      ]
    },
  ]
  errors: [
    {
      code: 6000
      name: "InvalidAmount"
      msg: "Invalid amount"
    },
    {
      code: 6001
      name: "InvalidSolAmount"
      msg: "Invalid SOL amount"
    },
    {
      code: 6002
      name: "InsufficientSolAmount"
      msg: "Insufficient SOL amount"
    },
    {
      code: 6003
      name: "InsufficientTokenAmount"
      msg: "Insufficient token amount"
    },
    {
      code: 6004
      name: "CurveComplete"
      msg: "Curve is complete"
    },
    {
      code: 6005
      name: "NotEnoughSolOutput"
      msg: "Not enough SOL output"
    },
    {
      code: 6006
      name: "NotEnoughTokens"
      msg: "Not enough tokens"
    },
    {
      code: 6007
      name: "AlreadyInitialized"
      msg: "Already initialized"
    },
  ]
}

export const IDL: PumpFun = {
  version: "0.1.0",
  name: "pump_fun",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "global",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "feeRecipient",
          type: "publicKey",
        },
        {
          name: "initialVirtualTokenReserves",
          type: "u64",
        },
        {
          name: "initialVirtualSolReserves",
          type: "u64",
        },
        {
          name: "initialRealTokenReserves",
          type: "u64",
        },
        {
          name: "tokenTotalSupply",
          type: "u64",
        },
        {
          name: "feeBasisPoints",
          type: "u64",
        },
      ],
    },
    {
      name: "create",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: true,
        },
        {
          name: "associatedBondingCurve",
          isMut: true,
          isSigner: false,
        },
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "global",
          isMut: false,
          isSigner: false,
        },
        {
          name: "bondingCurve",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadataProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "uri",
          type: "string",
        },
      ],
    },
    {
      name: "buy",
      accounts: [
        {
          name: "feeRecipient",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "associatedBondingCurve",
          isMut: true,
          isSigner: false,
        },
        {
          name: "associatedUser",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "bondingCurve",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "solAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "sell",
      accounts: [
        {
          name: "feeRecipient",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "associatedBondingCurve",
          isMut: true,
          isSigner: false,
        },
        {
          name: "associatedUser",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "bondingCurve",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "minSolOutput",
          type: "u64",
        },
      ],
    },
    {
      name: "complete",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "associatedBondingCurve",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "bondingCurve",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "setParams",
      accounts: [
        {
          name: "global",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "feeRecipient",
          type: "publicKey",
        },
        {
          name: "initialVirtualTokenReserves",
          type: "u64",
        },
        {
          name: "initialVirtualSolReserves",
          type: "u64",
        },
        {
          name: "initialRealTokenReserves",
          type: "u64",
        },
        {
          name: "tokenTotalSupply",
          type: "u64",
        },
        {
          name: "feeBasisPoints",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "bondingCurve",
      type: {
        kind: "struct",
        fields: [
          {
            name: "discriminator",
            type: "u64",
          },
          {
            name: "virtualTokenReserves",
            type: "u64",
          },
          {
            name: "virtualSolReserves",
            type: "u64",
          },
          {
            name: "realTokenReserves",
            type: "u64",
          },
          {
            name: "realSolReserves",
            type: "u64",
          },
          {
            name: "tokenTotalSupply",
            type: "u64",
          },
          {
            name: "complete",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "global",
      type: {
        kind: "struct",
        fields: [
          {
            name: "discriminator",
            type: "u64",
          },
          {
            name: "initialized",
            type: "bool",
          },
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "feeRecipient",
            type: "publicKey",
          },
          {
            name: "initialVirtualTokenReserves",
            type: "u64",
          },
          {
            name: "initialVirtualSolReserves",
            type: "u64",
          },
          {
            name: "initialRealTokenReserves",
            type: "u64",
          },
          {
            name: "tokenTotalSupply",
            type: "u64",
          },
          {
            name: "feeBasisPoints",
            type: "u64",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "CreateEvent",
      fields: [
        {
          name: "name",
          type: "string",
          index: false,
        },
        {
          name: "symbol",
          type: "string",
          index: false,
        },
        {
          name: "uri",
          type: "string",
          index: false,
        },
        {
          name: "mint",
          type: "publicKey",
          index: true,
        },
        {
          name: "bondingCurve",
          type: "publicKey",
          index: false,
        },
        {
          name: "user",
          type: "publicKey",
          index: true,
        },
      ],
    },
    {
      name: "TradeEvent",
      fields: [
        {
          name: "mint",
          type: "publicKey",
          index: true,
        },
        {
          name: "solAmount",
          type: "u64",
          index: false,
        },
        {
          name: "tokenAmount",
          type: "u64",
          index: false,
        },
        {
          name: "isBuy",
          type: "bool",
          index: false,
        },
        {
          name: "user",
          type: "publicKey",
          index: true,
        },
        {
          name: "timestamp",
          type: "i64",
          index: false,
        },
        {
          name: "virtualSolReserves",
          type: "u64",
          index: false,
        },
        {
          name: "virtualTokenReserves",
          type: "u64",
          index: false,
        },
        {
          name: "realSolReserves",
          type: "u64",
          index: false,
        },
        {
          name: "realTokenReserves",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "CompleteEvent",
      fields: [
        {
          name: "user",
          type: "publicKey",
          index: true,
        },
        {
          name: "mint",
          type: "publicKey",
          index: true,
        },
        {
          name: "bondingCurve",
          type: "publicKey",
          index: false,
        },
        {
          name: "timestamp",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "SetParamsEvent",
      fields: [
        {
          name: "feeRecipient",
          type: "publicKey",
          index: false,
        },
        {
          name: "initialVirtualTokenReserves",
          type: "u64",
          index: false,
        },
        {
          name: "initialVirtualSolReserves",
          type: "u64",
          index: false,
        },
        {
          name: "initialRealTokenReserves",
          type: "u64",
          index: false,
        },
        {
          name: "tokenTotalSupply",
          type: "u64",
          index: false,
        },
        {
          name: "feeBasisPoints",
          type: "u64",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidAmount",
      msg: "Invalid amount",
    },
    {
      code: 6001,
      name: "InvalidSolAmount",
      msg: "Invalid SOL amount",
    },
    {
      code: 6002,
      name: "InsufficientSolAmount",
      msg: "Insufficient SOL amount",
    },
    {
      code: 6003,
      name: "InsufficientTokenAmount",
      msg: "Insufficient token amount",
    },
    {
      code: 6004,
      name: "CurveComplete",
      msg: "Curve is complete",
    },
    {
      code: 6005,
      name: "NotEnoughSolOutput",
      msg: "Not enough SOL output",
    },
    {
      code: 6006,
      name: "NotEnoughTokens",
      msg: "Not enough tokens",
    },
    {
      code: 6007,
      name: "AlreadyInitialized",
      msg: "Already initialized",
    },
  ],
}

