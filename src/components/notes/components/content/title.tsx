import { useAppDispatch } from "@/states/hooks";
import {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface ContentTitleProps {
  id: string | number;
  initialValue: string;
  handleSave: (id: string | number, text: string) => void;
}

const Title = ({ id, initialValue, handleSave }: ContentTitleProps) => {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue(initialValue);
    !initialValue && textareaRef.current?.focus();

    return () => {
      dispatch({
        type: "save/removeOne",
        payload: id,
      });
    };
  }, [id, initialValue]);

  const onBlur = useCallback(
    async (e: FocusEvent<HTMLTextAreaElement>) => {
      if (!isChanged) {
        return;
      }

      setValue(e.target.value);
      const text = e.target.value;
      e.target.style.height = "0px";
      e.target.style.height = e.target.scrollHeight + "px";
      setLoading(true);
      await handleSave(id, text);
      setLoading(false);
      setIsChanged(false);
      dispatch({
        type: "save/removeOne",
        payload: id,
      });
    },
    [isChanged, id]
  );

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const t = value.replace(/\r?\n/g, "");
    e.target.value = t;
    setIsChanged(true);
    setValue(e.target.value);
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + "px";
    dispatch({
      type: "save/addOne",
      payload: id,
    });
  };
  return (
    <>
      <textarea
        ref={textareaRef}
        value={value}
        className="resize-none text-2xl w-full field overflow-hidden focus-visible:outline-none bg-transparent"
        rows={1}
        onChange={onChange}
        maxLength={100}
        onBlur={onBlur}
      />
      <div className="bg-current w-[40%] h-[0.1rem] mb-2 opacity-60"></div>
    </>
  );
};

export default Title;
