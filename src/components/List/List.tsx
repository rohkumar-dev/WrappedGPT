import { ListItem, ListItemProps } from "./ListItem";

export const List = ({ items, loading, error }: { items: ListItemProps[] | null; loading: boolean; error: Error | null }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[85vh]">
        <div className="w-16 h-16 border-4 border-spotify-green-dark border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !items || items.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[85vh] text-gray-400 text-xl">
        Something Went Wrong! Try again later!
      </div>
    );
  }

  return (
    <div className="space-y-2 w-full h-[85vh] overflow-y-auto">
      {items.map((item) => (
        <ListItem key={item.index} {...item} />
      ))}
    </div>
  );
};
