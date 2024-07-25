import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import InputWithLabel from "@/components/ui/input-with-label";
import { z } from "@/i18";
import { handleRSAEncrypt } from "@/lib/encryption";
import { cn } from "@/lib/utils";
import request from "@/request/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface PasswordValidProps {
  setConfirmed: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
  password: z
    .string()
    .refine((value) => /^[a-zA-Z0-9#?!@$%^&*-]{6,255}/.test(value), {
      params: { i18n: "password" },
    }),
});
const PasswordValid = ({ setConfirmed }: PasswordValidProps) => {
  const { t } = useTranslation(["translation", "message"]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await request.post("/account/password/", {
        password: handleRSAEncrypt(data.password),
      });
      toast.success(t("password-valid-success", { ns: "message" }));
      setConfirmed(true);
    } finally {
      setLoading(false);
    }
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const data = form.getValues();
      const { success: valid } = formSchema.safeParse(data);
      if (valid) {
        onSubmit(data);
        (e.target as HTMLInputElement).blur();
      }
    }
  };

  return (
    <div className="w-full sm:w-[90%] md:w-[50%] lg:w-[40%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithLabel
                    placeholder={t("password")}
                    {...field}
                    onKeyDown={onEnter}
                    extraNode={
                      <button
                        disabled={loading}
                        className={cn(
                          "absolute right-2 p-1 cursor-pointer text-ttertiary border rounded-full text-center transition-all scale-x-100"
                        )}
                        type="submit"
                        style={{
                          bottom: "6px",
                        }}
                      >
                        {loading ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <ArrowRight size={16} />
                        )}
                      </button>
                    }
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center gap-4"></div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordValid;
