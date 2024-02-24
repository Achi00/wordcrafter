"use client";
import React, { createContext, useState, useContext } from "react";

const AIResponseContext = createContext();

export const useAIResponse = () => useContext(AIResponseContext);

export const AIResponseProvider = ({ children }) => {
  const [introResponse, setIntroResponse] = useState("");
  const [topicsResponse, setTopicsResponse] = useState("");
  // for ai expand feature
  // pass content from editor to component
  const [contentToExpand, setContentToExpand] = useState("");
  // pass content from component to editor
  const [expandedContent, setExpandedContent] = useState("");
  const setExpandContent = (content) => {
    setContentToExpand(content);
  };
  // for ai summarize feature
  const [contentSummarize, setContentSummarize] = useState("");
  const [contentSummarizeList, setContentSummarizeList] = useState("");

  const setSummarizedContent = (content) => {
    setContentSummarize(content);
  };
  const setSummarizedContentList = (content) => {
    setContentSummarizeList(content);
  };

  // for content checking in editor
  const [isContentAvailable, setIsContentAvailable] = useState(false);

  // code chat
  // New state for chat functionality
  const [chatMessages, setChatMessages] = useState([]);

  // Function to append new chat messages
  const appendChatMessage = (message) => {
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  // append content to the last AI response (if it's part of an ongoing stream)
  const appendToLastAIResponse = (additionalContent) => {
    setChatMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage && lastMessage.sender === "assistant") {
        return [
          ...prevMessages.slice(0, -1),
          { ...lastMessage, content: lastMessage.content + additionalContent },
        ];
      }
      return prevMessages;
    });
  };

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
    contentSummarize,
    setContentSummarize,
    setSummarizedContent,
    contentSummarizeList,
    setContentSummarizeList,
    setSummarizedContentList,
    // New values for chat functionality
    chatMessages,
    appendChatMessage,
    appendToLastAIResponse,
  };

  return (
    <AIResponseContext.Provider value={value}>
      {children}
    </AIResponseContext.Provider>
  );
};
