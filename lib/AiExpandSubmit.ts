export const handleSubmitToServer = async () => {
  const content = getContentFromEditor();
  try {
    const response = await fetch("http://localhost:8080/v1/expandwithai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }), // Send the editor content
    });

    if (!response.ok || !response.body) {
      throw new Error("Failed to fetch");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break; // Stream completed
      }

      buffer += decoder.decode(value, { stream: true });
      const chunks = buffer.split("\n");

      for (let i = 0; i < chunks.length - 1; i++) {
        try {
          const parsedChunk = JSON.parse(chunks[i]);
          if (parsedChunk.type === "expand") {
            // Append new chunk to cumulative content
            setExpandedContent(
              (prevExtend: string) => prevExtend + parsedChunk.content
            );
          }
        } catch (e) {
          console.error("Error parsing chunk: ", e);
        }
      }

      buffer = chunks[chunks.length - 1];
    }
  } catch (error) {
    console.error("Error sending content to server:", error);
  }
};
