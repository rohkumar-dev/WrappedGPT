"use client"
import { Navbar } from "@/components/Navbar";
import { List, ListItemProps } from "@/components/List";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockDashboardData } from "@/fixtures/mockDashboardData";

// Define a type for the time range
export type TimeRange = "short_term" | "medium_term" | "long_term";

// Define an interface for the dictionary
export interface DashboardData {
  "short_term": {
    artistsList: ListItemProps[];
    tracksList: ListItemProps[];
  };
  "medium_term": {
    artistsList: ListItemProps[];
    tracksList: ListItemProps[];
  };
  "long_term": {
    artistsList: ListItemProps[];
    tracksList: ListItemProps[];
  };
}

export default function DashboardPage({
  data = mockDashboardData,
}: {
  data: DashboardData;
}) {
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");

  const { artistsList, tracksList } = data[timeRange];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex flex-col h-full">
        {/* Time Range Picker */}

        <div className="flex-1 flex justify-between px-8 py-4">
          {/* Songs List */}
          <div className="flex-1 pr-4">
            <h1 className="text-3xl font-semibold mb-6 mx-10 text-left">Top Tracks</h1>
            <List items={tracksList} />
          </div>

          {/* Artists List */}
          <div className="relative flex-1">
            <div className="">
              <h1 className="text-3xl font-semibold mb-6 mx-10 text-left">Top Artists</h1>
              <List items={artistsList} />
            </div>

            <Tabs
              defaultValue="short_term"
              className="bg-gray-800 text-white rounded-lg shadow-md"
              onValueChange={(value: TimeRange) => setTimeRange(value)}
            >
              <TabsList className="absolute top-0 right-0 mr-4">
                <TabsTrigger value="short_term">Short Term</TabsTrigger>
                <TabsTrigger value="medium_term">Medium Term</TabsTrigger>
                <TabsTrigger value="long_term">Long Term</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
