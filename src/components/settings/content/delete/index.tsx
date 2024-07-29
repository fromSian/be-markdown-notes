import { useAppSelector } from "@/states/hooks";
import { lazy } from "react";

const Official = lazy(() => import("./official.tsx"));
const Other = lazy(() => import("./other.tsx"));
const index = () => {
  const { account } = useAppSelector((state) => state.account);

  return account.type === "base" ? <Official /> : <Other />;
};

export default index;
