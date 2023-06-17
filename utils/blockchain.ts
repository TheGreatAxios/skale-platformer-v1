import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { skaleNebula } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import {
    braveWallet,
    injectedWallet,
    ledgerWallet,
    metaMaskWallet,
    mewWallet,
    okxWallet,
    omniWallet,
    trustWallet,
    walletConnectWallet,
    dawnWallet,
    argentWallet,
    bitskiWallet,
    coinbaseWallet,
    phantomWallet,
    rainbowWallet,
    safeWallet,
    tahoWallet,
    zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";


const { chains, publicClient } = configureChains(
    [{
        ...skaleNebula,
    }],
    [publicProvider()]
);
// const { connectors } = getDefaultWallets({
//   appName: 'SKALE Platformer',
//   projectId: '52ce48b522278bcf2da3624df1b5a210',
//   chains
// });

const projectId = "52ce48b522278bcf2da3624df1b5a210";

const connectors = connectorsForWallets([
    {
        groupName: "Popular",
        wallets: [
            injectedWallet({ chains }),
            coinbaseWallet({ chains, appName: "SKALE Platformer" }),
            metaMaskWallet({ projectId, chains }),
            phantomWallet({ chains }),
            walletConnectWallet({ projectId, chains }),
        ],
    },
    {
        groupName: "Less Popular",
        wallets: [
            argentWallet({ chains, projectId }),
            bitskiWallet({ chains }),       
            braveWallet({ chains }),
            dawnWallet({ chains }),
            trustWallet({ chains, projectId }),
            ledgerWallet({ chains, projectId }),
            mewWallet({ chains }),
            okxWallet({ chains, projectId }),
            omniWallet({ chains, projectId }),
            rainbowWallet({ chains, projectId }),
            safeWallet({ chains }),
            tahoWallet({ chains }),
            zerionWallet({ chains, projectId }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
});

export { chains, wagmiConfig };
