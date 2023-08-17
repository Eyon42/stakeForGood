/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { poolTogetherAddress, usdcAddress } from "@/contracts";
import {
  useErc20Allowance,
  useErc20ApprovalEvent,
  useErc20Approve,
  useErc20BalanceOf,
  usePrepareErc20Approve,
} from "@/generated";
import { parse } from "path";
import { useCallback, useEffect, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import NoSSR from "../NoSSR";
import { usePoolTogether, usePoolTogetherUser } from "@/hooks/PoolTogether";
import { BigNumber, ethers } from "ethers";
import { useRouter } from "next/router";

function WithdrawScreen() {
  return (
    <div className="flex flex-col gap-10 px-5 py-10">
      <h1 className="text-center text-2xl font-medium text-white">Withdraw</h1>
      <WithdrawButton />
    </div>
  );
}

function WithdrawButton() {
  // const { toast } = useToast();
  const { address } = useAccount();
  const pt = usePoolTogether();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(BigNumber.from(0));
  useEffect(() => {
    void (async () => {
      console.log("fetching balances");
      setLoading(true);
      const balances = await pt.prizePoolNetwork.getUsersPrizePoolBalances(
        address as string
      );
      console.log("calculating");
      let v = BigNumber.from(0);
      if (balances) {
        balances.forEach((balance) => {
          v = v.add(balance.balances.ticket);
        });
        setValue(v);
      }
      console.log("done");
      setLoading(false);
    })();
  }, [pt.prizePoolNetwork, address]);

  const withdraw = useCallback(async () => {
    setLoading(true);
    await pt.user?.withdraw(value);
    setLoading(false);
    void router.push("/");
  }, [pt, value]);

  return (
    <button
      disabled={loading}
      onClick={() => void withdraw()}
      className="rounded-full bg-primary px-4 py-2 text-dark disabled:opacity-50"
    >
      Withdraw
    </button>
  );
}

export default WithdrawScreen;
