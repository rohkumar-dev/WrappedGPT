import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI!;
const TOKEN_URL = "https://accounts.spotify.com/api/token";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  try {
    // Exchange authorization code for access token
    const response = await axios.post(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = response.data;

    // Store access token in cookies
    (await cookies()).set("spotify_access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600, // 1 hour
    });

    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error) {
    console.error("Error getting Spotify token:", error);
    return NextResponse.json({ error: "Failed to authenticate with Spotify" }, { status: 500 });
  }
}
