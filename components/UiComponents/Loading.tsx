import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="text-xl text-muted-foreground">Please Wait</p>
    </div>
  );
};

export default Loading;
