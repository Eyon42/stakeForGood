import { ethers } from "ethers";
import { msToS } from "@pooltogether/utilities";
import { Draw, PrizeDistribution, PrizeDistributor, PrizePoolNetwork, User } from "@pooltogether/v4-client-js";
import { mainnet } from "@pooltogether/v4-pool-data";

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
const chainId = 137;
const prizePoolAddress = "0x19DE635fb3678D8B8154E37d8C9Cdf182Fe84E60";

const prizePool = prizePoolNetwork.getPrizePool(chainId, prizePoolAddress)!
const signer = new ethers.Wallet(process.env.PROTOCOL_WALLET_PKEY!, providers[137]);
const user = new User(prizePool.prizePoolMetadata, signer, prizePool);
const prizeDistributorAddress = "0x8141BcFBcEE654c5dE17C4e2B2AF26B67f9B9056";

const prizeDistributor = prizePoolNetwork.getPrizeDistributor(
  chainId,
  prizeDistributorAddress
)!;

const signerPrizeDistributor = new PrizeDistributor(
  prizeDistributor.prizeDistributorMetadata,
  signer,
  prizeDistributor.contractMetadataList
);

async function main() {
  // Check if theres winning picks
  const draw = await prizeDistributor.getNewestDraw();
  const prizeDistribution = await prizeDistributor.getPrizeDistribution(draw.drawId);

  const currentTimestampSeconds = msToS(Date.now());
  const drawTimestampSeconds = draw.timestamp.toNumber();
  const drawExpirationTimestampSeconds =
    prizeDistribution.expiryDuration + drawTimestampSeconds;
  const isExpired: boolean =
    drawExpirationTimestampSeconds <= currentTimestampSeconds;

  const usersAddress = signer.address;

  const drawResults =
    await prizeDistributor.getUsersDrawResultsForDrawId(
      usersAddress,
      draw.drawId,
      prizeDistribution.maxPicksPerUser
    );

    const isUserAWinner = !drawResults.totalValue.isZero();

    const signerPrizeDistributor = new PrizeDistributor(
    prizeDistributor.prizeDistributorMetadata,
    signer,
    prizeDistributor.contractMetadataList
  );

  const txResponse =
    await signerPrizeDistributor.claimPrizesByDrawResults(drawResults);

    // Calculate distribution

    // Send out rewards

  }

main().then(() => {
  process.exit(0);
})