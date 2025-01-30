import { useEffect, useState } from "react";
import { UserData } from "@/types/UserData";
import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useUserData = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const session = await getSession();

        if (!session || !session.accessToken) {
          throw new Error("No Spotify access token found in session.");
        }

        const response = await fetch(`${API_BASE_URL}/spotifyTop?accessToken=${session.accessToken}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const result: UserData = await response.json();
        setData(result);
      } catch (err) {
        console.error("❌ Error fetching user data:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
