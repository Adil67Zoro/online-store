import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext();

export const StateProvider = ({ reducer, inititalState, children }) => (
    <StateContext.Provider value={useReducer(reducer, inititalState)}>
        {children}
    </StateContext.Provider> 
);

export const UseStateValue = () => useContext(StateContext)