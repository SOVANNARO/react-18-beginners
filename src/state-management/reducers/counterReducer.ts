interface Acton {
  type: "INCREMENT" | "DECREMENT" | "RESET";
}

const counterReducer = (state: number, action: Acton): number => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
};

export default counterReducer;
