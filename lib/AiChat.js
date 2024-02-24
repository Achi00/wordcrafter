import axios from "axios";

export const startChat = async (userId) => {
  try {
    const response = await axios.post(`http://localhost:8080/v1/codechat/`, {
      userId,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    throw error; // Rethrow the error so you can handle it where `startChat` is called
  }
};

export async function sendMessage(chatId, sender, content) {
  const response = await fetch(
    `http://localhost:8080/v1/codemessages/${chatId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender, content }),
    }
  );

  // Check if the response is ok (status in the range 200-299)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response; // This should return the response object
}
