import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/states/hooks";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useBlocker } from "react-router";

const BlockAlert = () => {
  const { saveList } = useAppSelector((state) => state.save);
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      saveList.length && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    const beforeunload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = false;
    };
    if (saveList.length) {
      window.addEventListener("beforeunload", beforeunload);
    }

    return () => {
      window.removeEventListener("beforeunload", beforeunload);
    };
  }, [saveList.length]);

  return (
    <div>
      {blocker.state === "blocked" && (
        <>
          <Dialog defaultOpen={true}>
            <DialogTrigger className="hidden"></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-left">notice</DialogTitle>

                <DialogDescription asChild className="text-left">
                  <div>
                    <p className="text-base my-4">
                      The changes haven't saved, are you absolutely sure to
                      leave?
                    </p>
                    <div className="flex gap-2 sm:gap-4 justify-end">
                      <button className="btn" onClick={() => blocker.proceed()}>
                        go on
                      </button>
                      <button className="btn" onClick={() => blocker.reset()}>
                        cancel
                      </button>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default BlockAlert;
