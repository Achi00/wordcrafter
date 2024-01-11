"use client";
import React, { createContext, useState, useContext } from "react";

const AIResponseContext = createContext();

export const useAIResponse = () => useContext(AIResponseContext);

export const AIResponseProvider = ({ children }) => {
  const [introResponse, setIntroResponse] = useState("");
  const [topicsResponse, setTopicsResponse] = useState("");

  const value = {
    introResponse,
    setIntroResponse,
    topicsResponse,
    setTopicsResponse,
  };

  return (
    <AIResponseContext.Provider value={value}>
      {children}
    </AIResponseContext.Provider>
  );
};
