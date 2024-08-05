import { logout } from "@/states/account.slice";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { AppThunkDispatch } from "@/states/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BeautyImage from "../ui/image";
import Select from "../ui/select";
const Avatar = () => {
  const { t } = useTranslation("header");
  const { isLogin, account } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch<AppThunkDispatch>();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout()).unwrap();
      dispatch({
        type: "note/setActive",
        payload: {
          info: undefined,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    isLogin && (
      <Select
        open={open}
        setOpen={setOpen}
        content={
          <div className="w-8 h-8 rounded-full bg-opacity-40 cursor-pointer text-center truncate text-lg bg-blue-300">
            {account.image ? (
              <BeautyImage src={account.image} className="w-full h-full" />
            ) : account.type === "trial" ? (
              "T"
            ) : account.email?.length ? (
              account.email[0]
            ) : (
              "N"
            )}
          </div>
        }
      >
        <div className="w-auto backdrop-blur-md bg-opacity-50 flex flex-col gap-2">
          <Link
            onClick={(e) => {
              setOpen(false);
            }}
            to="/settings"
          >
            {t("settings")}
          </Link>

          <button onClick={handleLogout}>{t("sign-out")}</button>
        </div>
      </Select>
    )
  );
};

export default Avatar;
