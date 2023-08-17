import { defineConfig } from "@wagmi/cli";
import { erc, hardhat, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [],
  plugins: [
    // hardhat({
    //   project: "../contracts",
    // }),
    react({
      useContractRead: true,
      useContractWrite: true,
      usePrepareContractWrite: true,
    }),
    erc({
      20: true,
    }),
  ],
});
