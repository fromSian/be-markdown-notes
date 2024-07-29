import DeleteConfirm from "@/components/ui/delete-confirm";
import { cn } from "@/lib/utils";
import request from "@/request/request";
import { useAppDispatch } from "@/states/hooks";
import { AppThunkDispatch } from "@/states/store";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import TitleKit from "../title-kit";
import PasswordValid from "./password-valid";
const Delete = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch<AppThunkDispatch>();
  const { t } = useTranslation(["settings", "message"]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

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
    <div className="mt-4">
      <TitleKit
        className="py-2 px-4 rounded-md bg-fail cursor-pointer"
        title={t("destroy-account.title")}
        info={t("destroy-account.description")}
        onClick={() => setOpen((v) => !v)}
      />
      <div
        className={cn(
          "grid transition-all",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div
          className={cn(
            "overflow-hidden flex flex-col justify-center items-center pb-2",
            open ? "pt-4" : "pt-0"
          )}
        >
          <PasswordValid setConfirmed={setConfirmed} />
          {confirmed && (
            <div className="flex gap-2 items-center">
              {loading && <Loader className="animate-spin" size={16} />}
              <DeleteConfirm
                content={
                  <button className="btn">
                    {t("destroy-account.confirm")}
                  </button>
                }
                handleDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Delete;
