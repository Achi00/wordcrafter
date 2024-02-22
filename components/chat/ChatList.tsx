"use client";
import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Trash2 } from "lucide-react";

const ChatList = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      {loading && (
        <div className="flex flex-col items-center">
          {Array.from({ length: 14 }).map((_, index) => (
            <div key={index} className="w-full p-2">
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
