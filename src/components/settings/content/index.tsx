import Account from "./account/info";
import Delete from "./delete";
import Note from "./note";
import System from "./system";

const Content = () => {
  return (
    <div className="p-4 truncate">
      <Account />
      <Note />
      <System />
      <Delete />
    </div>
  );
};

export default Content;
