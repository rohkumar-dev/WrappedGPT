import { useEffect, useState } from "react";
import { UserData } from "@/types/UserData";

export const useUserData = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("/api/spotifyTop");

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const result: UserData = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
