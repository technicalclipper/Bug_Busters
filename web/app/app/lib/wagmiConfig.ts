
import { createConfig, http } from 'wagmi'
import { mainnet, baseSepolia,rootstockTestnet } from 'wagmi/chains'
import { injected, metaMask, safe } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet,rootstockTestnet ],
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [rootstockTestnet.id]: http(),
  },
})
