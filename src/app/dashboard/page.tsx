"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { List } from "@/components/List";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Term } from "@/types/UserData";
import { getTermData } from "@/hooks/getTermData";
import { useUserData } from "@/hooks/useUserData";

export default function DashboardPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTerm = (searchParams.get("term") as Term) || Term.shortTerm;

  const { data, loading, error } = useUserData();

  const handleTermChange = (value: Term) => {
    const params = new URLSearchParams(searchParams);
    params.set("term", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex flex-col h-full">
        <div className="flex-1 flex justify-between px-8 py-4">
          {/* Songs List */}
          <div className="flex-1 pr-4">
            <h1 className="text-3xl font-semibold mb-6 mx-10 text-left">Top Tracks</h1>
            <List items={getTermData(data, currentTerm).tracks} loading={loading} error={error} />
          </div>

          {/* Artists List */}
          <div className="relative flex-1">
            <div className="">
              <h1 className="text-3xl font-semibold mb-6 mx-10 text-left">Top Artists</h1>
              <List items={getTermData(data, currentTerm).artists} loading={loading} error={error} />
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
}
