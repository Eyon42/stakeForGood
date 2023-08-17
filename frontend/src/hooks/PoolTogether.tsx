import { PoolTogetherContext } from "@/components/PoolTogetherProvider";
import { useContext } from "react";

export function usePoolTogetherUser() {
  const pooltogether = useContext(PoolTogetherContext);
  return pooltogether.user;
}

export function usePoolTogether() {
  const pooltogether = useContext(PoolTogetherContext);
  return pooltogether;
}
