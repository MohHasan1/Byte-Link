import Agreement from "@/components/AgrementAlert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Globe, Linkedin, Mail } from "lucide-react";

const ContactPage = () => {
  return (
    <>
      <div className="w-dvh h-dvh flex justify-center items-center">
        <Card className="text-center p-6 rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle>Contact Me</CardTitle>
            <CardDescription>
              For any questions or feedback, please reach out to me using the
              following email
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Badge variant="destructive" className="mx-auto p-4 text-lg">
              hasan.swe.dev@gmail.com
            </Badge>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                className="border p-2 rounded-xl bg-slate-700/20 text-orange-400 hover:underline transition duration-300 ease-in-out flex justify-center items-center gap-2 w-full sm:w-auto"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hasan.swe.dev@gmail.com"
                target="_blank"
              >
                <Mail size={20} />
                Send Email via Gmail
              </a>
              <a
                className="border p-2 rounded-xl bg-slate-700/20 text-blue-400 hover:underline transition duration-300 ease-in-out flex justify-center items-center gap-2 w-full sm:w-auto"
                href="https://outlook.live.com/mail/0/deeplink/compose?to=hasan.swe.dev@gmail.com"
                target="_blank"
              >
                <Mail size={20} />
                Send Email via Outlook.com
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/MohHasan1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-violet-200 rounded-full hover:bg-purple-700">
                  <Github size={20} />
                  GitHub
                </button>
              </a>

              <a
                href="https://www.linkedin.com/in/hasan-in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                  <Linkedin size={20} />
                  LinkedIn
                </button>
              </a>

              <a
                href="https://hasan-swe.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900">
                  <Globe size={20} />
                  Personal Website
                </button>
              </a>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <p className="text-center text-blue-300">
              This is a personal project, mostly to showcase my work. Enjoy
              exploring the platform! But rest assured, your data is 100% secure
              if you join.
            </p>

            <p className="text-center text-red-300">
              Please also follow the rules outlined for a safe and respectful
              experience.
            </p>

            <div className="bg-slate-800 p-2 rounded-2xl hover:bg-slate-700">
              <Agreement showAlert={false} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ContactPage;
