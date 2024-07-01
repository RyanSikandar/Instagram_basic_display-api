import axios from "axios";

export const getAccessToken = async (code) => {
  try {
    const response = await axios.post(
      "https://api.instagram.com/oauth/access_token",
    {
        client_id: "831240245208477",
        client_secret: "0edf95755fef26958b6829aaca04f2ae",
        grant_type: "authorization_code",
        redirect_uri: "https://smart-control-app-backend.vercel.app/",
        code: code,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response.data, "response this"); // Log response data
    return response.data; // Return response data instead of full response object
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error; // Rethrow the error to handle it in the caller function
  }
};

export const getPictures = async (accessToken) => {
    try {
        const response = await axios.get(
        `https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=${accessToken}`
        );
    
        console.log(response.data.data, "response single pics");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching pictures:", error);
        throw error; 
    }
    }

export const getNextPictures = async (accessToken, after) => {
    try {
        const response = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=${accessToken}%after=${after}`);
    
        console.log(response.data, "response more pics");
        return response.data;
    } catch (error) {
        console.error("Error fetching pictures:", error);
        throw error; 
    }
    }
