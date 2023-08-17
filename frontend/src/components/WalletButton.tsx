import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";

function WalletButton() {
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  return (
    <button
      onClick={() => void open()}
      className="flex w-64 items-center justify-center gap-4 rounded-full border-2 border-primary bg-dark py-2 text-xl  font-light text-dark text-primary"
    >
      {address
        ? address.slice(0, 6) + "..." + address.slice(-4)
        : "Connect Wallet"}
    </button>
  );
}

export default WalletButton;
