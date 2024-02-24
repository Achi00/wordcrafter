export const fetchUserInfo = async () => {
  try {
    const response = await fetch("http://localhost:8080/v1/users", {
      method: "GET",
      credentials: "include", // Important for sessions
    });
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
    } else {
      throw new Error("Failed to fetch user info");
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};
