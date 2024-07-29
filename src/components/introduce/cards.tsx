import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Section = ({ keys }: { keys: string[] }) => {
  const [active, setActive] = useState<string>();
  const { t } = useTranslation("introduce");

  return (
    <>
      <div className="flex gap-2 justify-between flex-wrap items-start">
        {keys.map((key) => (
          <div
            key={key}
            className={cn(
              "bg-secondary w-full md:w-[49%] lg:w-[49%] mb-4 rounded-md py-2 px-2 text-center cursor-pointer transition-all border-2 border-transparent",
              key === active && "bg-emphasis border-border"
            )}
            onClick={() => setActive((v) => (key === v ? undefined : key))}
          >
            {t(`catalog.${key}.title`)}
          </div>
        ))}
      </div>
      <div
        className={cn(
          "grid transition-all duration-100 w-full",
          active
            ? "grid-rows-[1fr] opacity-100 mb-4"
            : "grid-rows-[0fr] opacity-0 mb-0"
        )}
      >
        <div
          className={cn("overflow-hidden indent-8", active ? "pt-4" : "pt-0")}
        >
          {active ? t(`catalog.${active}.content`) : ""}
        </div>
      </div>
    </>
  );
};

const signKeys = ["official", "google", "trial", "forget-password"];
const noteKeys = [
  "note",
  "navigation",
  "expand",
  "sort",
  "datetime",
  "markdown",
];
const accountKeys = [
  "avatar",
  "change-password",
  "google-official",
  "trial-official",
  "delete-account",
];
const settingsKeys = ["language", "theme"];

const keys = {
  sign: signKeys,
  note: noteKeys,
  account: accountKeys,
  settings: settingsKeys,
};
const Cards = () => {
  const { t } = useTranslation("introduce");
  return (
    <>
      {Object.keys(keys).map((key) => (
        <div key={key} className="my-6">
          <p className="font-bold divider my-4 text-ttertiary">{t(key)}</p>
          <Section
            key={key}
            keys={keys[key as "sign" | "note" | "account" | "settings"]}
          />
        </div>
      ))}
    </>
  );
};

export default Cards;
