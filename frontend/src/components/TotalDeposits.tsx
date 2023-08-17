import { usePoolTogether } from "@/hooks/PoolTogether";
import { PrizePoolTokenBalances } from "@pooltogether/v4-client-js";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface IBalance {
  chainId: number;
  address: string;
  balances: PrizePoolTokenBalances;
}

function TotalDeposits() {
  const pt = usePoolTogether();
  const [totalDeposits, setTotalDeposits] = useState<undefined | IBalance[]>();
  const { address } = useAccount();
  useEffect(() => {
    pt.prizePoolNetwork
      .getUsersPrizePoolBalances(address as string)
      .then((balances) => {
        setTotalDeposits(balances);
      })
      .catch((error) => console.log(error));
  }, [pt.prizePoolNetwork, address]);
  let value = BigNumber.from(0);
  if (totalDeposits) {
    totalDeposits.forEach((balance) => {
      value = value.add(balance.balances.ticket);
    });
  }
  const valueString = Math.round(
    parseFloat(ethers.utils.formatUnits(value, 6))
  ).toString();
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-medium">Total Deposits:</h1>
      <span className="text-4xl">
        <span className="font-extrabold text-primary">{valueString}</span> USDC
      </span>
    </div>
  );
}

export default TotalDeposits;
