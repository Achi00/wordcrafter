"use client";
import React, { createContext, useState, useContext } from "react";

const AIResponseContext = createContext();

export const useAIResponse = () => useContext(AIResponseContext);

export const AIResponseProvider = ({ children }) => {
  const [introResponse, setIntroResponse] = useState("");
  const [topicsResponse, setTopicsResponse] = useState("");
  // pass content from editor to component
  const [contentToExpand, setContentToExpand] = useState("");
  // pass content from component to editor
  const [expandedContent, setExpandedContent] = useState("");
  const setExpandContent = (content) => {
    setContentToExpand(content);
  };

  // for content checking in editor
  const [isContentAvailable, setIsContentAvailable] = useState(false);

  const value = {
    introResponse,
    setIntroResponse,
    topicsResponse,
    setTopicsResponse,
    setExpandContent,
    contentToExpand,
    expandedContent,
    setExpandedContent,
    isContentAvailable,
    setIsContentAvailable,
  };

  return (
    <AIResponseContext.Provider value={value}>
      {children}
    </AIResponseContext.Provider>
  );
};
