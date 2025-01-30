"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Term, UserData, TermData } from "@/types/UserData";

// Hook to manage the current term state via URL
export const useTermState = (userData: UserData) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTerm = (searchParams.get("term") as Term) || Term.shortTerm;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("term", currentTerm);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [currentTerm, pathname, router, searchParams]);

  return { currentTerm, setCurrentTerm: (term: Term) => router.replace(`${pathname}?term=${term}`, { scroll: false }) };
};