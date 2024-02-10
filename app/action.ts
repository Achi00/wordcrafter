"use server";

const fetchAIStart = async () => {
  const response = await fetch("http://localhost:8080/v1/startwithai");

  const data = await response.json();

  console.log(data);

  return data;
};

export { fetchAIStart };
