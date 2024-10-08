import { addNote } from "@/request/notes";
import { useAppDispatch } from "@/states/hooks";
import { NoteNavigationType } from "@/types/notes";
import { useCallback, useState } from "react";
import type { DateRange } from "react-day-picker";
import Header from "./components/navigation/header";
import List from "./components/navigation/list";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [data, setData] = useState<NoteNavigationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [newing, setNewing] = useState(false);
  const [empty, setEmpty] = useState(false);

  const handleAddOneNote = useCallback(async () => {
    if (loading) {
      return;
    }

    try {
      setNewing(true);
      const response = await addNote();
      if (response) {
        setData((v) => [response, ...v]);
        dispatch({
          type: "note/setActive",
          payload: {
            info: response,
          },
        });
        setNewing(false);
        setEmpty(false);
      }
    } catch (error) {
      setNewing(false);
      console.log(error);
    }
  }, []);

  return (
    <div className="w-full h-full">
      <Header
        date={date}
        setDate={setDate}
        newing={newing}
        handleAddNew={handleAddOneNote}
        className={!date && !data.length ? "hidden" : "flex"}
      />

      <List
        date={date}
        data={data}
        setData={setData}
        loading={loading}
        setLoading={setLoading}
        handleAddNew={handleAddOneNote}
        newing={newing}
        empty={empty}
        setEmpty={setEmpty}
      />
    </div>
  );
};

export default Navigation;
