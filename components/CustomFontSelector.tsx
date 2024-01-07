import React, { EventHandler } from "react";

const CustomFontSelector = ({ setFontFamily }: any) => {
  const handleFontChange = (event: any) => {
    setFontFamily(event.target.value);
  };

  return (
    <select onChange={handleFontChange}>
      <option value="Helvetica-Neue">Helvetica Neue</option>
      <option value="Arial">Arial</option>
      <option value="Times New Roman">Times New Roman</option>
    </select>
  );
};

export default CustomFontSelector;
