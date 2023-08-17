import { useEthersSigner } from "@/hooks/ethers";
import {
  type PrizePool,
  PrizePoolNetwork,
  User,
} from "@pooltogether/v4-client-js";
import { mainnet } from "@pooltogether/v4-pool-data";
import { ethers } from "ethers";
import { type ReactNode, createContext } from "react";

const providers = {
  // Mainnet Ethereum
  1: new ethers.providers.AlchemyProvider(
    1,
    process.env.NEXT_PUBLIC_ALCHEMY_KEY_ETH
  ),
  // Polygon
  137: new ethers.providers.AlchemyProvider(
    137,
    process.env.NEXT_NEXT_PUBLIC_ALCHEMY_KEY_POL
  ),
  // Avalanche
  43114: new ethers.providers.JsonRpcProvider(
    "https://api.avax.network/ext/bc/C/rpc",
    43114
  ),
  10: new ethers.providers.JsonRpcProvider(
    "https://endpoints.omniatech.io/v1/op/mainnet/public",
    10
  ),
};
const prizePoolNetwork = new PrizePoolNetwork(providers, mainnet);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const prizePool = prizePoolNetwork.getPrizePool(
  137,
  "0x19DE635fb3678D8B8154E37d8C9Cdf182Fe84E60"
)!;

const defaultPoolTogetherContext = {
  prizePoolNetwork,
  prizePool,
  user: undefined,
};

export const PoolTogetherContext = createContext<{
  prizePoolNetwork: PrizePoolNetwork;
  prizePool: PrizePool;
  user: User | undefined;
}>(defaultPoolTogetherContext);

export function PoolTogetherProvider({ children }: { children: ReactNode }) {
  const signer = useEthersSigner({ chainId: 137 });
  let user: User | undefined;
  if (signer) {
    user = new User(prizePool.prizePoolMetadata, signer, prizePool);
  }

  return (
    <PoolTogetherContext.Provider
      value={{ ...defaultPoolTogetherContext, user }}
    >
      {children}
    </PoolTogetherContext.Provider>
  );
}
