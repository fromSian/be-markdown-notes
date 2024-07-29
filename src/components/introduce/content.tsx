import { useTranslation } from "react-i18next";
import Cards from "./cards";
import Video from "./video";
const Content = () => {
  const { t } = useTranslation("introduce");

  return (
    <div
      className="overflow-auto px-2 sm:px-4 lg:px-8"
      style={{ height: "calc(100vh - 120px)" }}
    >
      <Cards />
      <p className="text-xl font-bold text-center">
        {t("Usage Example Video")}
      </p>
      <Video src={"/video/introduce.mp4"} />
    </div>
  );
};

export default Content;
