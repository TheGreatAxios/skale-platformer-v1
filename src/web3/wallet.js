import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig } from '@wagmi/core'
import { skaleCalypsoTestnet } from '@wagmi/core/chains'

const chains = [skaleCalypsoTestnet]
const projectId = process.env.WALLET_CONNECT_PLATFORM_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
});

const ethereumClient = new EthereumClient(wagmiClient, chains);
const web3modal = new Web3Modal({ projectId }, ethereumClient);

export default web3modal;