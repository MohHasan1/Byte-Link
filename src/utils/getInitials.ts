export default function getInitials(fullName: string) {
  // Split the full name by spaces into an array of words
  const words = fullName?.split(" ");

  // Map each word to its first letter and join them to form the initials
  const initials = words?.map((word) => word.charAt(0).toUpperCase()).join("");

  return initials;
}
