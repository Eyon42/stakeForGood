import { useWeb3Modal } from "@web3modal/react";
import { type NextPage } from "next";
import Head from "next/head";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import WithdrawScreen from "@/components/screens/withdraw";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  console.log(isConnected);

  return (
    <>
      <Head>
        <title>Withdraw | S4G</title>
      </Head>
      <div className=" h-full min-h-screen w-full bg-dark">
        <WithdrawScreen />
      </div>
    </>
  );
};

export default Home;
