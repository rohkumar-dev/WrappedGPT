import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export async function GET() {
  console.log("📡 Incoming request to /api/spotifyUser");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("spotify_access_token")?.value;

  if (!accessToken) {
    console.error("❌ Unauthorized: No access token found in cookies.");
    return NextResponse.json({ error: "Unauthorized: No access token" }, { status: 401 });
  }

  console.log("🔑 Using access token to fetch user profile...");

  try {
    const response = await axios.get(`${SPOTIFY_API_BASE}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("✅ Successfully fetched Spotify user profile!");
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("❌ Error fetching Spotify user profile:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data,
    });

    return NextResponse.json({ error: "Failed to retrieve user profile from Spotify" }, { status: 500 });
  }
}
