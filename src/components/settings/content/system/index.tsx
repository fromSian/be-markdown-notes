import {
  updateDefaultLanguage,
  updateDefaultTheme,
} from "@/states/account.slice";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { AppThunkDispatch } from "@/states/store";
import { Loader } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import SelectValue from "../select-value";
import TitleKit from "../title-kit";
const languageOptions = [
  { label: "-", value: "" },
  { label: "en", value: "en" },
  { label: "zh-TW", value: "zh-TW" },
  { label: "zh-CN", value: "zh-CN" },
];

const System = () => {
  const { t } = useTranslation(["settings", "message"]);
  const { language, theme } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch<AppThunkDispatch>();

  const [lngLoading, setLngLoading] = useState(false);
  const [themeLoading, setThemeLoading] = useState(false);

  const setLanguage = async (value: string) => {
    try {
      setLngLoading(true);
      await dispatch(updateDefaultLanguage({ value })).unwrap();
      toast.success(
        t("update-language-success", {
          ns: "message",
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLngLoading(false);
    }
  };
  const setTheme = async (value: string) => {
    try {
      setThemeLoading(true);
      await dispatch(updateDefaultTheme({ value })).unwrap();
      toast.success(
        t("update-theme-success", {
          ns: "message",
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setThemeLoading(false);
    }
  };

  const themeOptions = useMemo(
    () => [
      { label: "-", value: "" },
      { label: t("theme.light"), value: "light" },
      { label: t("theme.dark"), value: "dark" },
      { label: t("theme.system"), value: "system" },
    ],
    []
  );

  return (
    <>
      <div className="divider italic my-4">{t("part.system")}</div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between py-2 px-4 rounded-md bg-emphasis">
          <TitleKit
            title={t("language.title")}
            info={t("language.description")}
          />
          <div className="flex gap-2 items-center">
            {lngLoading && <Loader className="animate-spin" size={16} />}
            <SelectValue
              value={language}
              setValue={setLanguage}
              items={languageOptions}
            />
          </div>
        </div>

        <div className="flex justify-between py-2 px-4 rounded-md bg-emphasis">
          <TitleKit title={t("theme.title")} info={t("theme.description")} />
          <div className="flex gap-2 items-center">
            {themeLoading && <Loader className="animate-spin" size={16} />}
            <SelectValue
              value={theme}
              setValue={setTheme}
              items={themeOptions}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default System;
