import Fail from "@/components/icons/fail";
import SuccessIcon from "@/components/icons/success";
import TooltipSimple from "@/components/ui/tooltip-simple";
import { cn } from "@/lib/utils";
import { fetchTrial, goGoogleAuth } from "@/request/account";
import { useAppDispatch } from "@/states/hooks";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import SignIn from "./signin";
import SignUp from "./signup";

const Sign = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation(["translation", "message"]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<"signin" | "signup" | undefined>("signin");
  const [trialStatus, setTrailStatus] = useState<
    "loading" | "fail" | "success" | ""
  >();
  const [forget, setForget] = useState(false);

  useEffect(() => {
    const _open = searchParams.get("open");
    if (_open && ["signin", "signup"].includes(_open)) {
      setOpen(_open as "signin" | "signup");
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({});
  }, [open]);

  const goSomeWhereElse = () => {
    setOpen(undefined);
  };

  const handleGoogleAuth = () => {
    goGoogleAuth();
    setOpen(undefined);
  };

  const handleTrial = async () => {
    try {
      setOpen(undefined);
      setTrailStatus("loading");
      const {
        defaultExpanded,
        showExactTime,
        sortInfo,
        language,
        theme,
        ...rest
      } = await fetchTrial();
      dispatch({
        type: "account/setAccount",
        payload: rest,
      });
      const systemConfig = {
        language: language,
        theme: theme,
      };
      dispatch({
        type: "account/setConfig",
        payload: systemConfig,
      });
      const noteConfig = {
        showExactTime: showExactTime,
        defaultExpanded: defaultExpanded,
        sortInfo: sortInfo,
      };
      dispatch({
        type: "note/setConfig",
        payload: noteConfig,
      });
      setTrailStatus("success");
      toast.success(t("trial-success", { ns: "message" }));
      navigate("/");
    } catch (error) {
      setTrailStatus("fail");
    }
  };
  return (
    <div className="flex flex-col p-4 justify-center xl:w-[40vw] lg:w-[45vw] md:w-[50vw]">
      <button
        className={cn(
          "btn-overlap mb-4 transition-all opacity-50 hover:opacity-100",
          open === "signin" && "opacity-100"
        )}
        onClick={() => setOpen("signin")}
      >
        {t("sign-in")}
      </button>
      {open === "signin" && (
        <button
          className="underline text-link text-sm text-right"
          onClick={() => setForget((v) => !v)}
        >
          {t(forget ? "switch-signin" : "forget-password")}
        </button>
      )}
      {forget ? (
        <SignUp
          open={open === "signin"}
          goSomeWhereElse={goSomeWhereElse}
          isRegister={false}
        />
      ) : (
        <SignIn open={open === "signin"} />
      )}

      <button
        className={cn(
          "btn-overlap mb-4 transition-all opacity-50 hover:opacity-100",
          open === "signup" && "opacity-100"
        )}
        onClick={() => setOpen("signup")}
      >
        {t("sign-up")}
      </button>
      <SignUp open={open === "signup"} goSomeWhereElse={goSomeWhereElse} />
      <TooltipSimple content={t("sign-in-with-google-info")}>
        <p
          className={cn(
            "btn-overlap w-full transition-all mb-4 opacity-50 hover:opacity-100"
          )}
          onClick={handleGoogleAuth}
        >
          {t("sign-in-with-google")}
        </p>
      </TooltipSimple>
      <TooltipSimple content={t("trial-info")}>
        <div
          className={cn(
            "btn-overlap w-full transition-all mb-4 opacity-50 hover:opacity-100 flex items-center gap-2 justify-center"
          )}
          onClick={handleTrial}
        >
          {t("trial")}
          {trialStatus === "loading" && <Loader className="animate-spin" />}
          {trialStatus === "success" && <SuccessIcon />}
          {trialStatus === "fail" && <Fail />}
        </div>
      </TooltipSimple>
    </div>
  );
};

export default Sign;
