"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface NavbarButtonProps {
  href: string;
  buttonText: string;
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({ href, buttonText }) => {
  const isActive = usePathname() == href;

  return (
    <Link href={href}>
      <div className="relative group">
        <Button
          className={`relative ${
            isActive ? "text-white font-bold" : "text-gray-300 font-light"
          } bg-transparent hover:bg-transparent hover:text-white rounded-xl drop-shadow-md inline-flex items-center justify-center`}
        >
          {buttonText}
        </Button>
        <div
          className="left-0 bottom-0 h-[1px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        ></div>
      </div>
    </Link>
  );
};