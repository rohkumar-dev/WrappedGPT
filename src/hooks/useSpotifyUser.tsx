import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

interface SpotifyUser {
  displayName: string;
  email: string;
  imageUrl: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Get from env

export const useSpotifyUser = () => {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        
        if (!session || !session.accessToken) {
          throw new Error("No Spotify access token found in session.");
        }

        const response = await fetch(`${API_BASE_URL}/spotifyUser?accessToken=${session.accessToken}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch user profile: ${response.statusText}`);
        }

        const data = await response.json();

        setUser({
          displayName: data.display_name,
          email: data.email,
          imageUrl: data.images?.[0]?.url || null,
        });
      } catch (err) {
        console.error("❌ Error fetching Spotify user profile:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
