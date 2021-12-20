import axios from "../axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// Data layer
export const myContext = createContext();

const ContextProvider = ({ reducer, initialState, children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    axios
      .post("/dashboard")
      .then((res) => {
        setUser(res.data);
        setUserName(res.data.username);
      })
      .catch((err) => {
        console.log(err.response);
        setUser(null);
      });
  }, []);
  return (
    <myContext.Provider value={{ user, userName, setUserName }}>
      {children}
    </myContext.Provider>
  );
};

export default ContextProvider;
// export const useStateProvider = () => useContext(StateContext);
