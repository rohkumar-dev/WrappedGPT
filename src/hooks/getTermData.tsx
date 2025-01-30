import type { TermData, UserData } from "@/types/UserData";
import type { Term } from "@/types/UserData";

// Function to get the corresponding TermData
export const getTermData = (userData: UserData | null, term: Term): TermData => {
  if (!userData || !userData[term]) { return { tracks: [], artists: [] }; }
  return userData[term];
};