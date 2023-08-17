import { type FC, type ReactNode, useEffect, useState } from "react";

const NoSSR: FC<{ children: ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <>{children}</>;
};

export default NoSSR;
