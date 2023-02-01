import { createContext, useReducer } from "react";

export const CommunityContext = createContext();

export const sourceReducer = (state, action) => {
  switch (action.type) {
    case "SET_IMGSOURCE":
      return { imgSource: action.payload };
    default:
      return state;
  }
};

export const CommunityContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sourceReducer, {
    imgSource: null,
  });

  return (
    <CommunityContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CommunityContext.Provider>
  );
};
