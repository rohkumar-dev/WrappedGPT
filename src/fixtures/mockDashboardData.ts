import { DashboardData } from "@/app/dashboard/page";
import { mockArtists } from "./mockArtists";
import { mockTracks } from "./mockTracks";

// Mock data variations for medium and long term
const mediumTermArtists = mockArtists.slice(1).concat(mockArtists[0]); // Rotate the list
const mediumTermTracks = mockTracks.slice(2).concat(mockTracks.slice(0, 2)); // Shift by 2

const longTermArtists = mockArtists.reverse(); // Reverse the list
const longTermTracks = mockTracks.reverse(); // Reverse the list

// Ensure indices of each artist are in order
const orderedMediumTracks = mediumTermTracks.map((track, index) => ({ ...track, index: index+1 }));
const orderedMediumArtists = mediumTermArtists.map((artist, index) => ({ ...artist, index: index+1 }));

const orderedLongTracks = longTermTracks.map((track, index) => ({ ...track, index: index+1 }));
const orderedLongArtists = longTermArtists.map((artist, index) => ({ ...artist, index: index+1 }));

export const mockDashboardData: DashboardData = {
  "short_term": {
    artistsList: mockArtists.reverse(),
    tracksList: mockTracks.reverse()
  },
  "medium_term": {
    artistsList: orderedMediumArtists,
    tracksList: orderedMediumTracks
  },
  "long_term": {
    artistsList: orderedLongArtists,
    tracksList: orderedLongTracks
  }
};
