import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI!;
const AUTH_URL = "https://accounts.spotify.com/authorize";

const SCOPES = ["user-top-read"].join(" ");

export async function GET() {
  const state = Math.random().toString(36).substring(7); // Generate a random state for security

  const authUrl = `${AUTH_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES)}&state=${state}`;

  return NextResponse.redirect(authUrl);
}
