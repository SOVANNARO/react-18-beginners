import { useState } from "react";
import "./ListGroup.css";
import styled from "styled-components";

interface ListItemProps {
  active: boolean;
}

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li<ListItemProps>`
  padding: 5px 0;
  background-color: ${(props) => (props.active ? "blue" : "none")};
`;

interface Props {
  title: string;
  items: string[];
  onSelectItem: (item: string) => void;
}

function ListGroup({ title, items, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div>
      <h1>{title}</h1>
      <List>
        {items.map((item, index) => (
          <ListItem
            active={index === selectedIndex}
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
            style={{
              backgroundColor: index === selectedIndex ? "lightgray" : "white",
            }}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ListGroup;
