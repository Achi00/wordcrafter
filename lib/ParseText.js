// Function to parse and style text
export const parseAndStyleText = (text) => {
  // Splitting text into segments for bold, italic, and code
  const segments = text
    .split(/(\*\*.*?\*\*)|(```.*?```)|(`.*?`)/g)
    .map((seg, index) => {
      if (!seg) return null;

      // Bold text
      if (seg.startsWith("**") && seg.endsWith("**")) {
        return (
          <span key={index} className="font-bold">
            {seg.slice(2, -2)}
          </span>
        );
      }
      // Code block (triple backticks)
      else if (seg.startsWith("```") && seg.endsWith("```")) {
        return (
          <span
            key={index}
            className="bg-gray-200 rounded px-1 font-mono whitespace-pre-line"
          >
            {seg.slice(3, -3)}
          </span>
        );
      }
      // Italic text (single backtick)
      else if (seg.startsWith("`") && seg.endsWith("`")) {
        return (
          <span key={index} className="italic text-white">
            {seg.slice(1, -1)}
          </span>
        );
      }
      // Regular text
      else {
        return seg;
      }
    });

  return (
    <div> {segments} </div> // Wrap everything in a containing element
  );
};
