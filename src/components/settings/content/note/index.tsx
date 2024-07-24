import { sortOptions } from "@/components/notes/components/content/operator/sort";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import {
  updateDefaultExpanded,
  updateShowExactTime,
  updateSortInfo,
} from "@/states/note.slice";
import { AppThunkDispatch } from "@/states/store";
import { SortInfo } from "@/types/notes";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import SelectValue from "../select-value";
import TitleKit from "../title-kit";
const Note = () => {
  const { t } = useTranslation(["settings", "message"]);
  const { defaultExpanded, showExactTime, sortInfo } = useAppSelector(
    (state) => state.note
  );
  const dispatch = useAppDispatch<AppThunkDispatch>();

  const [expandLoading, setExpandLoading] = useState(false);
  const [sortLoading, setSortLoading] = useState(false);
  const [timeLoading, setTimeLoading] = useState(false);

  const setDefaultExpanded = async (value: boolean) => {
    try {
      setExpandLoading(true);
      await dispatch(updateDefaultExpanded({ value })).unwrap();
      toast.success(t("update-expand-success", { ns: "message" }));
    } catch (error) {
      console.log(error);
    } finally {
      setExpandLoading(false);
    }
  };
  const setShowExactTime = async (value: boolean) => {
    try {
      setTimeLoading(true);
      await dispatch(updateShowExactTime({ value })).unwrap();
      toast.success(t("update-time-success", { ns: "message" }));
    } catch (error) {
      console.log(error);
    } finally {
      setTimeLoading(false);
    }
  };
  const setSortInfo = async (value: string) => {
    try {
      setSortLoading(true);
      await dispatch(
        updateSortInfo({ value } as {
          value: SortInfo;
        })
      ).unwrap();
      toast.success(t("update-sort-success", { ns: "message" }));
    } catch (error) {
      console.log(error);
    } finally {
      setSortLoading(false);
    }
  };
  return (
    <>
      <div className="divider italic my-4">{t("part.note")}</div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between py-2 px-2 sm:px-4 gap-2 rounded-md bg-emphasis">
          <TitleKit
            title={t("default-expand.title")}
            info={t("default-expand.description")}
          />
          <div className="flex gap-2 items-center">
            {expandLoading && <Loader className="animate-spin" size={16} />}
            <Switch
              checked={defaultExpanded}
              onCheckedChange={setDefaultExpanded}
            />
          </div>
        </div>
        <div className="flex justify-between py-2 px-2 sm:px-4 gap-2 rounded-md bg-emphasis">
          <TitleKit
            title={t("show-exact-time.title")}
            info={t("show-exact-time.description")}
          />
          <div className="flex gap-2 items-center">
            {timeLoading && <Loader className="animate-spin" size={16} />}
            <Switch
              checked={showExactTime}
              onCheckedChange={setShowExactTime}
            />
          </div>
        </div>
        <div className="flex justify-between py-2  px-2 sm:px-4 gap-2 rounded-md bg-emphasis">
          <TitleKit
            title={t("sort-info.title")}
            info={t("sort-info.description")}
          />

          <div className="flex gap-2 items-center">
            {sortLoading && <Loader className="animate-spin" size={16} />}
            <SelectValue
              value={sortInfo}
              setValue={setSortInfo}
              items={sortOptions}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
