/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react"

export const tokenContext = createContext();
function TokenContextProvider(props) {
    const [token, setToken] = useState(null);
  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </tokenContext.Provider>
  )
}

export default TokenContextProvider
