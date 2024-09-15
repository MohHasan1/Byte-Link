import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Agreement = ({ showAlert = false }: { showAlert?: boolean }) => {
  return (
    <>
      <AlertDialog defaultOpen={showAlert}>
        <AlertDialogTrigger>Show Rules</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-700 text-sm md:text-lg text-center">IMPORTANT!</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="sm:p-4 max-h-dvh" >
                <h1 className="text-lg md:text-2xl font-bold mb-4">
                  Byte-Link Usage Rules
                </h1>
                <ul className="list-disc text-xs sm:text-lg space-y-2">
                  <li>
                    No inappropriate pictures, titles, or descriptions. Uploaded
                    content must not contain illegal, harmful, or offensive
                    material.
                  </li>
                  <li>
                    Copyrighted material may only be uploaded with proper
                    authorization from the content owner.
                  </li>
                  <li>
                    Avoid sharing personal information for your own safety. Use
                    your own name for identification, but keep other personal
                    details private.
                  </li>
                  <li>
                    Harassment, hate speech, and discriminatory comments are
                    strictly prohibited.
                  </li>
                  <li>
                    Your password is securely hashed using Appwrite's Hash365,
                    based on the SHA-512 algorithm, ensuring strong encryption.
                    Your email is also protected.
                  </li>

                  <li>
                    This is a testing phase of the MVP (Minimum Viable Product).
                    Enjoy using the platform as it is, and keep in mind that it
                    is subject to change.
                  </li>
                  <li>
                    Try to post tech-related content, but other posts are
                    welcome as well.
                  </li>
                </ul>
                <div className="mt-6 font-semibold">
                  For any questions or feedback, email me at{" "}
                  <a
                    href="mailto:user.hasan@outlook.com"
                    className="text-blue-500 hover:underline"
                  >
                    user.hasan@outlook.com
                  </a>
                  .
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Agreement;
