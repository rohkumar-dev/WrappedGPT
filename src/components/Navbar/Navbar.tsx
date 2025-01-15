import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { NavbarButton } from "./NavbarButton";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center">
      <Link href="/dashboard">
        <div className="text-xl font-bold hover:scale-105 transition-transform duration-300">
          <span className="text-white">Wrapped</span>
          <span className="text-spotify-green">GPT</span>
        </div>
      </Link>

      <div className="flex-1 flex justify-center space-x-32">
        <NavbarButton href="/dashboard" buttonText="Your Top Tracks & Artists" />
        <NavbarButton href="/recommendations" buttonText="Recommendations" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-white text-md font-medium">Username</div>
          <Link href="/">
            <div className="text-gray-400 text-xs font-thin">Log Out</div>
          </Link>
        </div>
        <Avatar>
          <AvatarImage src="/path-to-profile-pic.jpg" alt="User Profile" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};
