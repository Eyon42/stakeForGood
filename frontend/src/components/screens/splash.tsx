import Image from "next/image";
import ConnectButton from "../ConnectButton";

function SplashScreen() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-4">
      <Image
        src="/splashLogo.png"
        alt="Splash"
        width={500}
        height={500}
        className="my-[-20px]"
      />
      <ConnectButton />
    </div>
  );
}

export default SplashScreen;
