# Multicall3

*Michael Elliot &lt;mike@makerdao.com&gt;Joshua Levine &lt;joshua@makerdao.com&gt;Nick Johnson &lt;arachnid@notdot.net&gt;Andreas Bigger &lt;andreas@nascent.xyz&gt;Matt Solomon &lt;matt@mattsolomon.dev&gt;*

> Multicall3

Aggregate results from multiple function calls

*Multicall &amp; Multicall2 backwards-compatibleAggregate methods are marked `payable` to save 24 gas per call*

## Methods

### aggregate

```solidity
function aggregate(Multicall3.Call[] calls) external payable returns (uint256 blockNumber, bytes[] returnData)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| calls | Multicall3.Call[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| blockNumber | uint256 | undefined |
| returnData | bytes[] | undefined |

### aggregate3

```solidity
function aggregate3(Multicall3.Call3[] calls) external payable returns (struct Multicall3.Result[] returnData)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| calls | Multicall3.Call3[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| returnData | Multicall3.Result[] | undefined |

### aggregate3Value

```solidity
function aggregate3Value(Multicall3.Call3Value[] calls) external payable returns (struct Multicall3.Result[] returnData)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| calls | Multicall3.Call3Value[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| returnData | Multicall3.Result[] | undefined |

### blockAndAggregate

```solidity
function blockAndAggregate(Multicall3.Call[] calls) external payable returns (uint256 blockNumber, bytes32 blockHash, struct Multicall3.Result[] returnData)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| calls | Multicall3.Call[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| blockNumber | uint256 | undefined |
| blockHash | bytes32 | undefined |
| returnData | Multicall3.Result[] | undefined |

### getBasefee

```solidity
function getBasefee() external view returns (uint256 basefee)
```

Gets the base fee of the given blockCan revert if the BASEFEE opcode is not implemented by the given chain




#### Returns

| Name | Type | Description |
|---|---|---|
| basefee | uint256 | undefined |

### getBlockHash

```solidity
function getBlockHash(uint256 blockNumber) external view returns (bytes32 blockHash)
```

Returns the block hash for the given block number



#### Parameters

| Name | Type | Description |
|---|---|---|
| blockNumber | uint256 | The block number |

#### Returns

| Name | Type | Description |
|---|---|---|
| blockHash | bytes32 | undefined |

### getBlockNumber

```solidity
function getBlockNumber() external view returns (uint256 blockNumber)
```

Returns the block number




#### Returns

| Name | Type | Description |
|---|---|---|
| blockNumber | uint256 | undefined |

### getChainId

```solidity
function getChainId() external view returns (uint256 chainid)
```

Returns the chain id




#### Returns

| Name | Type | Description |
|---|---|---|
| chainid | uint256 | undefined |

### getCurrentBlockCoinbase

```solidity
function getCurrentBlockCoinbase() external view returns (address coinbase)
```

Returns the block coinbase




#### Returns

| Name | Type | Description |
|---|---|---|
| coinbase | address | undefined |

### getCurrentBlockDifficulty

```solidity
function getCurrentBlockDifficulty() external view returns (uint256 difficulty)
```

Returns the block difficulty




#### Returns

| Name | Type | Description |
|---|---|---|
| difficulty | uint256 | undefined |

### getCurrentBlockGasLimit

```solidity
function getCurrentBlockGasLimit() external view returns (uint256 gaslimit)
```

Returns the block gas limit




#### Returns

| Name | Type | Description |
|---|---|---|
| gaslimit | uint256 | undefined |

### getCurrentBlockTimestamp

```solidity
function getCurrentBlockTimestamp() external view returns (uint256 timestamp)
```

Returns the block timestamp




#### Returns

| Name | Type | Description |
|---|---|---|
| timestamp | uint256 | undefined |

### getEthBalance

```solidity
function getEthBalance(address addr) external view returns (uint256 balance)
```

Returns the (ETH) balance of a given address



#### Parameters

| Name | Type | Description |
|---|---|---|
| addr | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| balance | uint256 | undefined |

### getLastBlockHash

```solidity
function getLastBlockHash() external view returns (bytes32 blockHash)
```

Returns the block hash of the last block




#### Returns

| Name | Type | Description |
|---|---|---|
| blockHash | bytes32 | undefined |

### tryAggregate

```solidity
function tryAggregate(bool requireSuccess, Multicall3.Call[] calls) external payable returns (struct Multicall3.Result[] returnData)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| requireSuccess | bool | undefined |
| calls | Multicall3.Call[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| returnData | Multicall3.Result[] | undefined |

### tryBlockAndAggregate

```solidity
function tryBlockAndAggregate(bool requireSuccess, Multicall3.Call[] calls) external payable returns (uint256 blockNumber, bytes32 blockHash, struct Multicall3.Result[] returnData)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| requireSuccess | bool | undefined |
| calls | Multicall3.Call[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| blockNumber | uint256 | undefined |
| blockHash | bytes32 | undefined |
| returnData | Multicall3.Result[] | undefined |




