import { fetchTrial, goGoogleAuth } from "@/request/account";
import { useAppDispatch } from "@/states/hooks";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Select from "../ui/select";

const SignContent = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    navigate("/welcome?open=signin");
  };

  const handleSignUp = () => {
    navigate("/welcome?open=signup");
  };

  const handleTrial = async () => {
    try {
      setLoading(true);
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
      navigate("/");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn border truncate" onClick={handleSignIn}>
        {t("sign-in")}
      </button>
      <button className="btn border truncate" onClick={handleSignUp}>
        {t("sign-up")}
      </button>
      <button className="btn border truncate" onClick={goGoogleAuth}>
        {t("sign-in-with-google")}
      </button>
      <button
        disabled={loading}
        className="btn border truncate flex gap-2"
        onClick={handleTrial}
      >
        {loading && <Loader size={16} className="animate-spin" />}
        {t("trial")}
      </button>
    </>
  );
};

const SignFold = () => {
  const { t } = useTranslation("header");
  const [open, setOpen] = useState(false);

  return (
    <div className="block md:hidden">
      <Select
        open={open}
        setOpen={setOpen}
        content={<button className="btn">{t("sign-in-up")}</button>}
      >
        <div className="w-auto backdrop-blur-md bg-opacity-50 flex flex-col gap-2 items-center p-2">
          <SignContent />
        </div>
      </Select>
    </div>
  );
};

const Sign = () => {
  return (
    <>
      <div className="hidden flex-1 md:flex items-center justify-center gap-2 md:gap-4">
        <SignContent />
      </div>
      <SignFold />
    </>
  );
};

export default Sign;
