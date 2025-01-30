import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { UserData } from "@/types/UserData";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`; // Ensures seconds are always two digits
};


const fetchTopData = async (token: string, type: "tracks" | "artists", term: string) => {
  const limit = 50;
  let allItems: any[] = [];

  // Function to fetch data with offset
  const fetchWithOffset = async (offset: number) => {
    const url = `${SPOTIFY_API_BASE}/me/top/${type}?time_range=${term}_term&limit=${limit}&offset=${offset}`;

    try {
      console.log(`🚀 Fetching ${type} data for ${term} term... (offset: ${offset})`);
      console.log(`🔗 Request URL: ${url}`);

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(`✅ Success fetching ${type} data for ${term} term (offset: ${offset})!`);

      return response.data.items.map((item: any, index: number) => ({
        index: allItems.length + index + 1, // Maintain proper index numbering
        name: item.name,
        artistName: type === "tracks" ? item.artists[0]?.name || null : null,
        imageUrl: item.album?.images[0]?.url || item.images[0]?.url || null,
        duration: type === "tracks" ? formatDuration(item.duration_ms) : null,
        spotifyUrl: item.external_urls.spotify,
      }));
    } catch (error: any) {
      console.error(`❌ Error fetching ${type} for ${term} term (offset: ${offset}):`, {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url,
        responseData: error.response?.data,
      });

      return [];
    }
  };

  // Fetch first 50
  allItems = await fetchWithOffset(0);

  // Fetch next 50 (only if first fetch had 50 items)
  if (allItems.length === 50) {
    const nextBatch = await fetchWithOffset(50);
    allItems = [...allItems, ...nextBatch];
  }

  return allItems;
};

export async function GET() {
  console.log("📡 Incoming request to /api/spotifyTop");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("spotify_access_token")?.value;

  if (!accessToken) {
    console.error("❌ Unauthorized: No access token found in cookies.");
    return NextResponse.json({ error: "Unauthorized: No access token" }, { status: 401 });
  }

  console.log("🔑 Found access token, fetching data...");

  try {
    const userData: UserData = {
      shortTerm: {
        tracks: await fetchTopData(accessToken, "tracks", "short"),
        artists: await fetchTopData(accessToken, "artists", "short"),
      },
      mediumTerm: {
        tracks: await fetchTopData(accessToken, "tracks", "medium"),
        artists: await fetchTopData(accessToken, "artists", "medium"),
      },
      longTerm: {
        tracks: await fetchTopData(accessToken, "tracks", "long"),
        artists: await fetchTopData(accessToken, "artists", "long"),
      },
    };

    console.log("✅ Successfully fetched all user data!");

    return NextResponse.json(userData);
  } catch (error: any) {
    console.error("❌ Error fetching Spotify top data:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data,
    });

    return NextResponse.json({ error: "Failed to retrieve data from Spotify" }, { status: 500 });
  }
}
