
import { createConfig, http } from 'wagmi'
import { mainnet, baseSepolia } from 'wagmi/chains'
import { injected, metaMask, safe } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, baseSepolia],
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [baseSepolia.id]: http(),
  },
})
