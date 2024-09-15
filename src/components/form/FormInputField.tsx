import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { type FC } from "react";
import { Muted } from "../typography/typography";

const FormInputField: FC<FormInputFieldProps> = (props) => {
  const {
    form,
    type = "text",
    name,
    label,
    placeholder = undefined,
    description = undefined,
    autoComplete = undefined
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
              <Input
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                {...field}
                className="bg-slate-900"
              />
            </FormControl>
            <FormDescription className="text-center">{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormInputField;

type FormInputFieldProps = {
  form: any;
  type?: "text" | "email" | "password";
  name: string;
  label: string;
  placeholder?: string | undefined;
  description?: string | undefined;
  autoComplete?: string | undefined;
};
