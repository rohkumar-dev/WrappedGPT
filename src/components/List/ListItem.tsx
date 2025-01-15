import { FaSpotify } from "react-icons/fa";
import Link from "next/link";

export interface ListItemProps {
  index: number;
  name: string;
  artistName: string | null;
  imageUrl: string | null;
  duration: string | null;
  spotifyUrl: string;
}


export const ListItem = (props: ListItemProps) => {
  const { index, name, artistName, imageUrl, duration, spotifyUrl } = props;

  return (
    <Link href={spotifyUrl}>
    <div
      className="group flex items-center justify-between px-4 py-2 hover:bg-green-900 rounded-md transition-colors"
    >
      <div className="flex items-center space-x-4">
        <span className="text-gray-400 group-hover:text-white w-6 text-center">{index}</span>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${name} album cover`}
              className="w-12 h-12 rounded object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-12 h-12 bg-spotify-green rounded transform group-hover:scale-105 transition-transform duration-300"></div>
          )}
        <div className="flex flex-col">
          <span className="text-gray-200 group-hover:text-white font-medium truncate">{name}</span>
          <span className="text-gray-400 group-hover:text-gray-300 text-sm">{artistName || ""}</span>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <span className="text-gray-400 group-hover:text-gray-300">{duration || ""}</span>
        <div className="text-spotify-green-dark group-hover:text-spotify-green">
          <FaSpotify size={20} />
        </div>
      </div>
    </div>
    </Link>
  );
};