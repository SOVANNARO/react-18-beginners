import { useReducer } from "react";
import authReducer from "./reducers/authReducer";

const LoginStatus = () => {
  const [user, dispatch] = useReducer(authReducer, "");
  return (
    <div>
      <h1>Login Status: {user}</h1>
      <button onClick={() => dispatch({ type: "LOGIN", username: "naro" })}>
        Login
      </button>
      <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
    </div>
  );
};

export default LoginStatus;
