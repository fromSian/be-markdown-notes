import Code from "@/components/welcome/sign/components/code";
import Email from "@/components/welcome/sign/components/email";
import Password from "@/components/welcome/sign/components/password";
import { handleRSAEncrypt } from "@/lib/encryption";
import { cn } from "@/lib/utils";
import request from "@/request/request";
import { useAppDispatch } from "@/states/hooks";
import { AppThunkDispatch } from "@/states/store";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import TitleKit from "../title-kit";
export type Step = "email" | "code" | "password" | "success";
const TrailToBase = () => {
  const naviage = useNavigate();
  const dispatch = useAppDispatch<AppThunkDispatch>();
  const { t } = useTranslation(["settings", "translation", "message"]);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendVerificationCode = async (_email: string) => {
    const url = "/account/send-code/";
    await request.post(url, { email: _email });
  };

  const handlePasswordSubmit = useCallback(
    async (_password: string) => {
      const url = "/account/trial-base/";
      const response = await request.post(url, {
        email,
        password: handleRSAEncrypt(_password),
      });
      toast.success(t("trial-password-success", { ns: "message" }));
      setTimeout(() => {
        naviage("/welcome");
        dispatch({
          type: "note/setActive",
          payload: {
            info: undefined,
          },
        });
      }, 2000);
    },
    [email]
  );

  return (
    <div className="flex flex-col gap-2 justify-center">
      <TitleKit
        className="py-2 px-4 rounded-md bg-emphasis cursor-pointer"
        title={t("convert-type")}
        onClick={() => setOpen((v) => !v)}
      />
      <div
        className={cn(
          "grid transition-all duration-500 w-full",
          open
            ? "grid-rows-[1fr] opacity-100 mb-4"
            : "grid-rows-[0fr] opacity-0 mb-0"
        )}
      >
        <div
          className={cn(
            "overflow-hidden flex flex-col justify-center items-center",
            open ? "pt-4" : "pt-0"
          )}
        >
          <div className="w-full sm:w-[90%] md:w-[50%] lg:w-[40%]">
            {step !== "success" && (
              <Email
                step={step}
                setStep={setStep}
                setEmail={setEmail}
                sendVerificationCode={sendVerificationCode}
              />
            )}
            {step === "code" && (
              <Code
                buttonStr={t("re-verify-code", { ns: "translation" })}
                setStep={setStep}
                email={email}
                sendVerificationCode={sendVerificationCode}
              />
            )}
            {step === "password" && (
              <Password handlePasswordSubmit={handlePasswordSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailToBase;
