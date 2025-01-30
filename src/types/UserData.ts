import type { ListItemProps } from "@/components/List";

export interface TermData {
  tracks: ListItemProps[];
  artists: ListItemProps[];
}

export enum Term {
  shortTerm = "shortTerm",
  mediumTerm = "mediumTerm",
  longTerm = "longTerm"
}

export interface UserData {
  shortTerm: TermData;
  mediumTerm: TermData;
  longTerm: TermData;
}