import { UserData } from "@/types/UserData";
import { mockArtists } from "./mockArtists";
import { mockTracks } from "./mockTracks";
import { ListItemProps } from "@/components/List";

// Helper function to shuffle an array randomly and assign indices
const shuffle = (list: ListItemProps[]) => {
  return list
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }, index) => ({ ...item, index: index + 1 }));
};

export const mockDashboardData: UserData = {
  shortTerm: {
    tracks: shuffle(mockTracks),
    artists: shuffle(mockArtists),
  },
  mediumTerm: {
    tracks: shuffle(mockTracks),
    artists: shuffle(mockArtists),
  },
  longTerm: {
    tracks: shuffle(mockTracks),
    artists: shuffle(mockArtists),
  },
};