import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { type FC } from "react";
import { Muted } from "../typography/typography";
import { Textarea } from "../ui/textarea";

const FormTextArea: FC<FormTextAreaProps> = (props) => {
  const {
    form,
    name,
    label,
    placeholder = undefined,
    description = undefined,
  } = props;

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-center">
              <Muted>{label}</Muted>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholder}
                id={name}
                {...field}
                className="bg-slate-900"
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormTextArea;

type FormTextAreaProps = {
  form: any;
  name: string;
  label: string;
  placeholder?: string | undefined;
  description?: string | undefined;
};
