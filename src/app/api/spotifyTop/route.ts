import { NextResponse } from "next/server";
import axios from "axios";
import { UserData } from "@/types/UserData";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

const fetchTopData = async (token: string, type: "tracks" | "artists", term: string) => {
  const limit = 50;
  let allItems: any[] = [];

  const fetchWithOffset = async (offset: number) => {
    const url = `${SPOTIFY_API_BASE}/me/top/${type}?time_range=${term}_term&limit=${limit}&offset=${offset}`;

    try {
      console.log(`🚀 Fetching ${type} data for ${term} term... (offset: ${offset})`);
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.items.map((item: any, index: number) => ({
        index: allItems.length + index + 1,
        name: item.name,
        artistName: type === "tracks" ? item.artists[0]?.name || null : null,
        imageUrl: item.album?.images[0]?.url || item.images[0]?.url || null,
        duration: type === "tracks" ? new Date(item.duration_ms).toISOString().substr(14, 5) : null,
        spotifyUrl: item.external_urls.spotify,
      }));
    } catch (error: any) {
      console.error(`❌ Error fetching ${type} for ${term} term:`, {
        message: error.message,
        status: error.response?.status,
        url,
        responseData: error.response?.data,
      });

      return [];
    }
  };

  allItems = await fetchWithOffset(0);
  if (allItems.length === 50) {
    const nextBatch = await fetchWithOffset(50);
    allItems = [...allItems, ...nextBatch];
  }

  return allItems;
};

export async function GET(req: Request) {
  console.log("📡 Incoming request to /api/spotifyTop");

  const url = new URL(req.url);
  const accessToken = url.searchParams.get("accessToken");

  if (!accessToken) {
    console.error("❌ Unauthorized: No access token provided.");
    return NextResponse.json({ error: "Unauthorized: No access token" }, { status: 401 });
  }

  console.log("🔑 Using provided access token, fetching data...");

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
      responseData: error.response?.data,
    });

    return NextResponse.json({ error: "Failed to retrieve data from Spotify" }, { status: 500 });
  }
}
