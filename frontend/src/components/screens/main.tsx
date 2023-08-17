import Countdown from "../Countdown";
import TotalDeposits from "../TotalDeposits";
import TXButtons from "../TxButtons";
import WalletButton from "../WalletButton";

function MainScreen() {
  return (
    <div className="flex flex-col items-center gap-9 px-5 py-10 text-white">
      <WalletButton />
      <h1 className="text-2xl font-medium">
        Welcome to <span className="text-primary">Stake4Good</span>🌱💰
      </h1>
      <Countdown />
      <TotalDeposits />
      <TXButtons />
      <p className="text-center">
        <span className="font-bold">Prize distribution:</span>
        <br />
        <span className="font-bold text-primary">ReFi projects: 50%</span>
        <br />
        Contributors: 40%
        <br />
        Stake4Good platform: 10%
      </p>
    </div>
  );
}

export default MainScreen;
