import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1504509546545-e000b4a62425?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
  
  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      <div className="relative text-center">
        <h1 className="text-white text-6xl sm:text-9xl font-bold mb-6 drop-shadow-lg">
          WrappedGPT
        </h1>

        <Link href="/api/spotifyAuth">
          <Button className="bg-spotify-green hover:bg-spotify-green-dark text-gray-200 px-6 py-3 text-md rounded-lg font-light drop-shadow-md">
            Connect to Spotify
          </Button>
        </Link>

      </div>
    </div>
  );
}