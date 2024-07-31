import DeleteConfirm from "@/components/ui/delete-confirm";
import request from "@/request/request";
import { useAppDispatch } from "@/states/hooks";
import { AppThunkDispatch } from "@/states/store";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import TitleKit from "../title-kit";

const Other = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch<AppThunkDispatch>();
  const { t } = useTranslation(["settings", "message"]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await request.delete("/account/delete/");
      toast.success(t("account-deleted-success", { ns: "message" }));
      setTimeout(() => {
        navigate("/welcome");
        dispatch({
          type: "note/setActive",
          payload: {
            info: undefined,
          },
        });
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-4 flex gap-2 justify-between bg-fail py-2 px-4 rounded-md cursor-pointer">
      <TitleKit
        title={t("destroy-account.title")}
        info={t("destroy-account.description")}
      />
      <div className="flex gap-2">
        {loading && <Loader size={16} className="animate-spin" />}
        <DeleteConfirm
          content={
            <button
              className="rounded-md px-2 border bg-background"
              disabled={loading}
            >
              {t("destroy-account.confirm")}
            </button>
          }
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Other;
