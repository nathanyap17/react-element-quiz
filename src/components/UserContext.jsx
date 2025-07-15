import React, { createContext, useState } from "react";

// Create the context to hold the user data and deliver with parent - App.js
export const UserContext = createContext();

// UserContext provider
export default function UserProvider({ children }) {
    const [name, setName] = useState("");

    return <UserContext.Provider value={{name, setName}}>{children}</UserContext.Provider>;
}