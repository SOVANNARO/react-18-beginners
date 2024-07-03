import ListGroup from "./components/ListGroup";


function App() {
  const items = ["New York", "San Francisco", "Tokyo", "London"];
  const onSelectItem = (item: string) => {
    console.log(item);
  };
  return (
    <ListGroup title="List Group" items={items} onSelectItem={onSelectItem} />
  );
}

export default App;
