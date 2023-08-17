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
import { useCallback, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import NoSSR from "../NoSSR";
import { usePoolTogetherUser } from "@/hooks/PoolTogether";
import { ethers } from "ethers";
import { useRouter } from "next/router";

function DepositScreen() {
  return (
    <div className="flex flex-col gap-10 px-5 py-10">
      <h1 className="text-center text-2xl font-medium text-white">
        Deposit into the prize pool:
      </h1>
      <DepositInput />
    </div>
  );
}

function DepositInput() {
  const [value, setValue] = useState("");

  const { address } = useAccount();
  const { data } = useErc20BalanceOf({
    address: usdcAddress,
    args: [address!],
  });
  let balance;
  if (data) {
    balance = parseInt(formatUnits(data, 6)).toString();
  }
  const max = parseInt(balance || "0");

  function updateValue(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") {
      setValue("");
      return;
    }
    console.log(e.target.value);
    let v = 0;
    try {
      v = Math.round(parseFloat(e.target.value));
    } catch (e) {
      console.log(e);
    }
    console.log(v);
    if (isNaN(v)) {
      setValue("");
      return;
    }
    if (v > max) {
      setValue(max.toString());
    }
    setValue(v.toString());
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-5 text-5xl">
        <input
          className="w-40 border-b-2 border-primary border-opacity-50 bg-transparent text-center font-extrabold text-primary decoration-transparent outline-none ring-0 active:border-opacity-80 "
          type="text"
          name="depositValue"
          value={value}
          onChange={updateValue}
        />
        <span className="font-extrabold">USDC</span>
      </div>
      <NoSSR>
        <div className="flex items-center gap-5 text-2xl">
          Balance: {balance} USDC
        </div>
      </NoSSR>
      <button
        onClick={() => setValue(max.toString())}
        className="rounded-full bg-primary px-4 py-2 text-dark"
      >
        Max.
      </button>
      <TxButton value={value} />
    </div>
  );
}

interface TxButtonProps {
  value: string;
}
function TxButton({ value }: TxButtonProps) {
  const { address, isConnected } = useAccount();
  const {
    data: tokenAllowance,
    isSuccess: allowanceReady,
    refetch,
  } = useErc20Allowance({
    address: usdcAddress,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    args: [address!, poolTogetherAddress],
  });
  useErc20ApprovalEvent({
    address: usdcAddress,
    listener: (e) => {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { owner, spender } = e[0]!.args;
      console.log({ owner, spender });
      if (owner === address && spender === poolTogetherAddress) {
        void refetch();
      }
    },
  });
  const [approvedDone, setApprovedDone] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const needsApproval =
    !approvedDone &&
    allowanceReady &&
    (tokenAllowance || 0) < parseUnits(`${value || 0}`, 6);
  return needsApproval ? (
    <ApproveTokenButton
      tokenContractAddress={usdcAddress}
      contractAddress={poolTogetherAddress}
      enabled={isConnected}
      maxUsdValue={parseInt(value || "0")}
      setDone={() => setApprovedDone(true)}
    />
  ) : (
    <DepositButton
      contractAddress={poolTogetherAddress}
      amount={parseInt(value || "0")}
      enabled={isConnected}
    />
  );
}

interface IApproveTokenButtonProps {
  tokenContractAddress: `0x${string}`;
  contractAddress: `0x${string}`;
  enabled: boolean;
  maxUsdValue: number;
  setDone: () => void;
}
function ApproveTokenButton({
  tokenContractAddress,
  contractAddress,
  enabled,
  maxUsdValue,
  setDone,
}: IApproveTokenButtonProps) {
  console.log({
    tokenContractAddress,
    contractAddress,
    enabled,
    maxUsdValue,
  });
  // const { toast } = useToast();
  const preparedApproval = usePrepareErc20Approve({
    address: tokenContractAddress,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    args: [contractAddress, parseUnits(`${maxUsdValue}`, 18)], // Use contract decimals
    enabled,
  });

  const approveToken = useContractWrite({
    ...preparedApproval.config,
    onSuccess: () => {
      // toast({
      //   title: "Token Approved",
      // });
    },
  });
  const waitApproval = useWaitForTransaction({ hash: approveToken.data?.hash });
  if (waitApproval.isSuccess) {
    setDone();
  }

  return (
    <>
      <button
        disabled={preparedApproval.isLoading}
        onClick={approveToken.writeAsync}
        className="rounded-full bg-primary px-4 py-2 text-dark disabled:opacity-50"
      >
        Approve Tokens
      </button>
      <span className={waitApproval.isLoading ? "block" : "hidden"}>
        loading
      </span>
    </>
  );
}

interface IDepositButtonProps {
  contractAddress: `0x${string}`;
  enabled: boolean;
  amount: number;
}
function DepositButton({ enabled, amount }: IDepositButtonProps) {
  // const { toast } = useToast();
  const user = usePoolTogetherUser();
  const router = useRouter();

  return (
    <button
      // disabled={!enabled}
      onClick={() => {
        console.log("depositing");
        void user
          ?.depositAndDelegate(
            ethers.utils.parseUnits(amount.toString(), 6),
            process.env.NEXT_PUBLIC_DELEGATE_ADDRESS,
            {
              gasLimit: 700000,
            }
          )
          .then(() => router.push("/"));
      }}
      className="rounded-full bg-primary px-4 py-2 text-dark"
    >
      Deposit
    </button>
  );
}

export default DepositScreen;
