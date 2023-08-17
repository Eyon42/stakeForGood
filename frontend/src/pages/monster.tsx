/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ethers } from "ethers";
import { type NextPage } from "next";
import Head from "next/head";
import { type FC, type ReactNode, useEffect, useState } from "react";

import { mainnet } from "@pooltogether/v4-pool-data";
import NoSSR from "@/components/NoSSR";
import { PrizePoolNetwork, User } from "@pooltogether/v4-client-js";
import usdcABI from "@/abi/usdc";

const useConnect = () => {
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );
  const providers = {
    // Mainnet Ethereum
    1: new ethers.providers.AlchemyProvider(
      1,
      "qvD6aflryEu5Y2V42NiOP7bt4RT4MhOj"
    ),
    // Polygon
    137: new ethers.providers.AlchemyProvider(
      137,
      "vW1ieT79sn1B7WZ_rqljjsiMzJtZfTQS"
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
  const [address, setAddress] = useState<string | null>(null);
  async function connect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    await provider.send("eth_requestAccounts", []);
    ethers;
    const signer = provider.getSigner();
    setSigner(signer);
    setAddress(await signer.getAddress());
  }
  return {
    signer,
    connect,
    isConnected: !!signer,
    address,
    providers,
  };
};

function usePoolTogether({
  signer,
  providers,
  address,
}: {
  signer: ethers.providers.JsonRpcSigner | null;
  providers: Record<number, ethers.providers.BaseProvider>;
  address: string | null;
}) {
  const prizePoolNetwork = new PrizePoolNetwork(providers, mainnet);
  const prizePool = prizePoolNetwork.getPrizePool(
    137,
    "0x19DE635fb3678D8B8154E37d8C9Cdf182Fe84E60"
  );
  let user: User | undefined;
  if (signer && address && prizePool) {
    user = new User(prizePool.prizePoolMetadata, signer, prizePool);
  }
  return {
    prizePoolNetwork,
    prizePool,
    user,
  };
}

const Home: NextPage = () => {
  const { signer, providers, connect, isConnected, address } = useConnect();
  const { prizePool, user, prizePoolNetwork } = usePoolTogether({
    signer,
    providers,
    address,
  });
  console.log(prizePool);

  return (
    <>
      <Head>
        <title>Fullstack Web3 DApp</title>
        <meta
          name="description"
          content="Fullstack Web3 Dapp built with hardhat, Next.js and wagmi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-primary flex min-h-screen flex-col items-center justify-center gap-8 bg-black">
        <h1 className="text-3xl font-bold text-white">Fullstack Web3 app</h1>
        Test
        {address}
        {isConnected}
        <NoSSR>
          {isConnected ? (
            <div className="flex flex-col items-center justify-center gap-12">
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-white">Connected to wallet</p>
                <p className="text-white">{address}</p>
                <button
                  className="bg-secondary rounded-full px-4 py-2 font-bold text-white"
                  onClick={() => {
                    if (user) {
                      (async () => {
                        console.log("delegating");
                        // await user.delegateTickets(
                        //   "0x2EE16a2c6753F48cC0cC58FCc407F805e5A24Ad4"
                        // );
                        // const ticketPermit =
                        //   await user.getPermitAndDelegateSignaturePromise(
                        //     "0x2EE16a2c6753F48cC0cC58FCc407F805e5A24Ad4"
                        //   );
                        // console.log(ticketPermit);
                        // const permit =
                        //   await user.getPermitAndDepositSignaturePromise(
                        //     ethers.utils.parseUnits("2", 6)
                        //   );

                        // console.log(permit);

                        // await user.depositAndDelegateWithSignature(
                        //   ethers.utils.parseUnits("2", 6),
                        //   permit!,
                        //   ticketPermit!,
                        //   "0x2EE16a2c6753F48cC0cC58FCc407F805e5A24Ad4",
                        //   {
                        //     gasLimit: 300000,
                        //   }
                        // );
                        const usdc = new ethers.Contract(
                          "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                          usdcABI,
                          signer!
                        );
                        await usdc.approve(
                          "0x19DE635fb3678D8B8154E37d8C9Cdf182Fe84E60",
                          ethers.utils.parseUnits("2", 6)
                        );
                        await user.depositAndDelegate(
                          ethers.utils.parseUnits("2", 6),
                          "0x2EE16a2c6753F48cC0cC58FCc407F805e5A24Ad4",
                          {
                            gasLimit: 700000,
                          }
                        );
                      })()
                        .then((r) => console.log(r))
                        .catch((e) => console.log(e));
                    }
                  }}
                >
                  delegaten
                </button>
              </div>
            </div>
          ) : (
            <button
              className="bg-secondary rounded-full px-4 py-2 font-bold text-white"
              onClick={() => void connect()}
            >
              Conectar Wallet
            </button>
          )}
        </NoSSR>
      </main>
    </>
  );
};

export default Home;
