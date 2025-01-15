import { ListItem, ListItemProps } from "./ListItem";

export const List = ({ items }: { items: ListItemProps[] }) => {
  return (
    <div className="space-y-2 w-full max-h-[70vh] overflow-y-auto">
      {items.map((item) => (
        <ListItem key={item.index} {...item} />
      ))}
    </div>
  );
};
