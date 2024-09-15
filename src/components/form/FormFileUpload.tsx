
import { type FC, useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { H4, Lead, Muted, P } from "../typography/typography";
import { ImageUp } from "lucide-react";
import { Button } from "../ui/button";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

const FormFileUpload: FC<FileUploadProps> = (props) => {
  const {
    form,
    name,
    label,
    placeholder = undefined,
    description = undefined,
    imageUrl,
  } = props;

  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>("");

  const onDrop: onDropProps = useCallback(
    (acceptedFiles, field) => {

      setFile(acceptedFiles);
      field.onChange(acceptedFiles);

      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

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
              <Dropzone
                accept={{ "image/*": [".png", ".jpeg", ".jpg", ".svg"] }}
                onDrop={(acceptedFiles) => onDrop(acceptedFiles, field)}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div
                      {...getRootProps()}
                      className="cursor-pointer flex flex-col justify-center items-center bg-slate-900 rounded-md border border-input"
                    >
                      <input {...getInputProps()} placeholder={placeholder} />
                      {/* If a file is uploaded */}
                      {fileUrl && (
                        <>
                          <div className="flex-center flex-col p-7 h-80 lg:h-[312px] gap-1">
                            <img
                              src={fileUrl}
                              alt="Uploaded file preview"
                              className="h-full"
                            />
                          </div>
                          <Muted className="border-t w-full text-center p-2">
                            <P>Drop or Click to replace the image.</P>
                          </Muted>
                        </>
                      )}
                      {/* If no file is uploaded */}
                      {!fileUrl && (
                        <div className="flex-center flex-col p-7 h-80 lg:h-[412px] gap-1">
                          {!imageUrl && (
                            <>
                              <Muted>
                                <ImageUp className="size-28 xl:size-32" />
                              </Muted>
                              <H4>Drag and Drop Photos here</H4>
                              <Lead>
                                <P>SVG, PNG, JPG, JPEG</P>
                              </Lead>
                              <Button variant={"secondary"} className="mt-8">
                                Click here to upload images
                              </Button>
                            </>
                          )}
                          {imageUrl && (
                            <>
                              <div className="flex-center flex-col p-7 h-80 lg:h-[312px] gap-1">
                                <img
                                  src={imageUrl}
                                  alt="Uploaded file preview"
                                  className="h-full"
                                />
                              </div>
                              <Muted className="border-t w-full text-center p-2">
                                <P>Drop or Click to update the image.</P>
                              </Muted>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormFileUpload;

type FileUploadProps = {
  form: any;
  name: string;
  label?: string;
  placeholder?: string | undefined;
  description?: string | undefined;

  imageUrl?: string;
};

type onDropProps = (
  acceptedFiles: File[],
  field: ControllerRenderProps<FieldValues, string>
) => void;

// to view user uploaded image we need to create a blob (temp url) and use it to view.
