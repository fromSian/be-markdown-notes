import Fail from "@/components/icons/fail";
import Header from "@/components/introduce/header";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const GoogleFail = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");
  }, []);

  return (
    <>
      <Header />
      <div className="flex mt-8 flex-col gap-4 justify-center items-center">
        <Fail
          className="w-16 h-16 mb-4"
          style={{
            fontSize: 40,
          }}
        />
        <p className="text-ttertiary">{searchParams.get("message") || ""}</p>

        <p className="text-xl font-bold">{t("google.fail.title")}</p>
        <p>{t("google.fail.description")}</p>
      </div>
    </>
  );
};

export default GoogleFail;
