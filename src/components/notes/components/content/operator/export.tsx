import TooltipSimple from "@/components/ui/tooltip-simple";
import { Download, Loader } from "lucide-react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface ExportProps {
  handleExport: () => void;
}

const Export = memo(({ handleExport }: ExportProps) => {
  const { t } = useTranslation(["note", "message"]);
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      await handleExport();
    } catch (error) {
      toast.error(t("export-fail", { ns: "message" }));
    } finally {
      setLoading(false);
    }
  };
  return (
    <TooltipSimple content={t("export")}>
      <div>
        {loading ? (
          <Loader className="animate-spin" size={16} />
        ) : (
          <Download size={20} onClick={onClick} />
        )}
      </div>
    </TooltipSimple>
  );
});

export default Export;
