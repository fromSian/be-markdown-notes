import { useAppDispatch } from "@/states/hooks";
import { X } from "lucide-react";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import Editor, { EditorRef } from "./editor";
import Status from "./item/status";
import MaskLoader from "./mask-loader";

interface NewEditorProps {
  setAdding: Dispatch<SetStateAction<boolean>>;
  onNewSubmit: (content: string, summary: string) => void;
}
const NewEditor = forwardRef(
  ({ setAdding, onNewSubmit }: NewEditorProps, ref) => {
    const { t } = useTranslation("note");
    const editorRef = useRef<EditorRef>();
    const [loading, setLoading] = useState(false);
    const parentRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<
      "loading" | "success" | "fail" | undefined
    >(undefined);
    const dispatch = useAppDispatch();

    useImperativeHandle(ref, () => editorRef?.current);

    useEffect(() => {
      if (parentRef.current) {
        parentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }

      return () => {
        dispatch({
          type: "save/removeOne",
          payload: "new",
        });
      };
    }, []);

    const onSubmit = async () => {
      if (!editorRef || !editorRef?.current) {
        return;
      }

      try {
        setStatus("loading");
        const content = editorRef.current?.getHTMLValue();
        const summary = editorRef.current?.getTextValue();
        await onNewSubmit(content, summary);
        setStatus("success");
        setAdding(false);
        dispatch({
          type: "save/removeOne",
          payload: "new",
        });
      } catch (error) {
        setStatus("fail");
        console.log(error);
      }
    };
    const onCancel = () => {
      setAdding(false);
      dispatch({
        type: "save/removeOne",
        payload: "new",
      });
    };

    const onEditorUpdate = () => {
      dispatch({
        type: "save/addOne",
        payload: "new",
      });
    };

    return (
      <div ref={parentRef} className="pb-8 min-h-32 relative pt-2 mb-4">
        <div className="flex justify-between items-center">
          <p className="text-ttertiary text-sm px-1 bg-secondary flex items-center rounded-md h-max">
            {t("new-one")}
          </p>

          <div
            className="flex gap-2 justify-center items-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div
              onClick={onCancel}
              className="group cursor-pointer px-2 rounded-sm text-center flex items-center bg-secondary border border-transparent hover:border-border hover:bg-transparent py-1"
            >
              <X
                size={16}
                className={
                  "text-ttertiary group-hover:text-tprimary group-active:scale-95 transition-all"
                }
              />
            </div>
            <Status status={status} isChanged={true} handleSave={onSubmit} />
          </div>
        </div>
        <Editor content={""} ref={editorRef} onUpdate={onEditorUpdate} />

        {loading && <MaskLoader loading={loading} />}
      </div>
    );
  }
);

export default NewEditor;
