import { NextResponse } from "next/server";
import axios from "axios";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export async function GET(req: Request) {
  console.log("📡 Incoming request to /api/spotifyUser");

  const url = new URL(req.url);
  const accessToken = url.searchParams.get("accessToken");

  if (!accessToken) {
    console.error("❌ Unauthorized: No access token provided.");
    return NextResponse.json({ error: "Unauthorized: No access token" }, { status: 401 });
  }

  console.log("🔑 Using access token to fetch user profile...");

  try {
    const response = await axios.get<{ display_name: string; id: string; email: string; images: { url: string }[] }>(
      `${SPOTIFY_API_BASE}/me`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    console.log("✅ Successfully fetched Spotify user profile!");
    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error fetching Spotify user profile:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        responseData: error.response?.data,
      });
    } else {
      console.error("❌ Unknown error:", error);
    }

    return NextResponse.json({ error: "Failed to retrieve user profile from Spotify" }, { status: 500 });
  }
}