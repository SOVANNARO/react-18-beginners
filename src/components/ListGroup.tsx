import { useState } from "react";

interface Props {
  title: string;
  items: string[];
  onSelectItem: (item: string) => void;
}

function ListGroup({ title, items, onSelectItem }: Props) {
  const [selected, setSelected] = useState(-1);

  return (
    <>
      <h1>{title}</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            onClick={() => {
              setSelected(index);
              onSelectItem(item);
            }}
            key={item}
            className={
              selected === index ? "list-group-item active" : "list-group-item"
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
