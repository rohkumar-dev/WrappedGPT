"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { NavbarButton } from "./NavbarButton";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSpotifyUser } from "@/hooks/useSpotifyUser";

export const Navbar = () => {
  const { user } = useSpotifyUser();

  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center">
      <Link href="/dashboard">
        <div className="text-xl font-bold hover:scale-105 transition-transform duration-300">
          <span className="text-white">Wrapped</span>
          <span className="text-spotify-green">GPT</span>
        </div>
      </Link>

      <div className="flex-1 flex justify-center space-x-32">
        <NavbarButton href="/dashboard" buttonText="Your Top" />
        <NavbarButton href="/recommendations" buttonText="Recommendations" />
        <NavbarButton href="/howitworks" buttonText="How It Works" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-white text-lg font-medium leading-tight">{user?.displayName || "Unknown"}</div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-gray-400 text-sm font-thin hover:text-white transition-colors mt-0"
          >
            Log Out
          </button>
        </div>
        <Avatar>
          {user?.imageUrl ? (
            <AvatarImage src={user.imageUrl} alt={`${user.displayName}'s Profile`} />
          ) : (
            // Fallback avatar with a green circle and user's initial
            <AvatarFallback className="bg-spotify-green text-black font-bold flex items-center justify-center">
              {user?.displayName?.charAt(0).toUpperCase() || "" /* Extracts user's initial and capitalizes it. */}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
    </nav>
  );
};
