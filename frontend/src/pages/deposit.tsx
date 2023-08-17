import { useWeb3Modal } from "@web3modal/react";
import { type NextPage } from "next";
import Head from "next/head";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SplashScreen from "@/components/screens/splash";
import MainScreen from "@/components/screens/main";
import NoSSR from "@/components/NoSSR";
import DepositScreen from "@/components/screens/deposit";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  console.log(isConnected);

  return (
    <>
      <Head>
        <title>Deposit | S4G</title>
      </Head>
      <div className=" h-full min-h-screen w-full bg-dark">
        <DepositScreen />
      </div>
    </>
  );
};

export default Home;
