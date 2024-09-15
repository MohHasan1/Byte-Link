import Agrement from "@/components/AgrementAlert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ContactPage = () => {
  return (
    <>
      <div className="w-dvh h-dvh flex justify-center items-center">
        <Card className="text-center p-6 rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              For any questions or feedback, please reach out to us using the
              following email
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Badge variant="secondary" className="mx-auto p-4 text-lg">
              user.hasan@outlook.com
            </Badge>
            <a
              className="text-blue-500 hover:underline transition duration-300 ease-in-out"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=user.hasan@outlook.com"
              target="_blank"
            >
              Send Email via Gmail
            </a>
            <a
              className="text-blue-500 hover:underline transition duration-300 ease-in-out"
              href="https://outlook.live.com/mail/0/deeplink/compose?to=user.hasan@outlook.com"
              target="_blank"
            >
              Send Email via Outlook.com
            </a>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <p className="text-center text-blue-300">
              This is a testing phase of the MVP (Minimum Viable Product). Enjoy
              using the platform as it is, and keep in mind that it is subject
              to change.
            </p>
            <p className="text-center text-red-300">
              Please also follow the rules outlined for a safe and respectful
              experience.
            </p>

            <div className="bg-slate-800 p-2 rounded-2xl hover:bg-slate-700">
              <Agrement showAlert={false} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ContactPage;
