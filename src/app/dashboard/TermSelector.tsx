"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Term } from "@/types/UserData";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function TermSelector({ currentTerm }: { currentTerm: Term }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTermChange = (value: Term) => {
    const params = new URLSearchParams(searchParams);
    params.set("term", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs
      defaultValue={currentTerm}
      className="bg-gray-800 text-white rounded-lg shadow-md"
      onValueChange={handleTermChange}
    >
      <TabsList className="absolute top-0 right-0 mr-4">
        <TabsTrigger value={Term.shortTerm}>Short Term</TabsTrigger>
        <TabsTrigger value={Term.mediumTerm}>Medium Term</TabsTrigger>
        <TabsTrigger value={Term.longTerm}>Long Term</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
