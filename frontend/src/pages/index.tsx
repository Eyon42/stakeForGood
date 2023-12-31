import { useWeb3Modal } from "@web3modal/react";
import { type NextPage } from "next";
import Head from "next/head";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SplashScreen from "@/components/screens/splash";
import MainScreen from "@/components/screens/main";
import NoSSR from "@/components/NoSSR";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  console.log(isConnected);

  return (
    <>
      <Head>
        <title>Stake4Good</title>
      </Head>
      <div className=" h-full min-h-screen w-full bg-dark">
        <NoSSR>{isConnected ? <MainScreen /> : <SplashScreen />}</NoSSR>
      </div>
    </>
  );
};

export default Home;
