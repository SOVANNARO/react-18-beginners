import { useState } from "react";
import "./App.css";
import { Alert } from "./components/Alert";
import AlertDismissible from "./components/AlertDismissible";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London"];
  const [isAlert, setIsAlert] = useState(false);

  const onSelectItem = (item: string) => {
    console.log(item);
  };

  const onClickBtn = () => {
    console.log("Button Clicked");
  };

  const onClickDismiss = () => {
    setIsAlert(false);
  };

  return (
    <>
      <Alert> Alert </Alert>
      <ListGroup items={items} title="List Group" onSelectItem={onSelectItem} />
      <Button color="primary" onClick={onClickBtn}>
        Primary
      </Button>
      <AlertDismissible
        title="Alert Dismissible"
        isAlert={isAlert}
        onClose={onClickDismiss}
      />
      <div className="pt-2">
        <Button color="primary" onClick={() => setIsAlert(true)}>
          Alert Dismissible
        </Button>
      </div>
    </>
  );
}

export default App;
