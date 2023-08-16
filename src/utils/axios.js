import axios from "axios";
import { BASE_URL } from "./consts";

const $axios = axios.create();

$axios.interceptors.request.use(
  async (config) => {
    const LSData = JSON.parse(localStorage.getItem("LSData"));
    if (LSData && LSData.tokens) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${LSData.tokens.access}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

$axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response) {
      if (error.response.status === 401 && !config._retry) {
        config._retry = true;
        const access = await refreshAccessToken();
        axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        return $axios(config);
      }
    }

    return Promise.reject(error);
  }
);

async function refreshAccessToken() {
  try {
    const LSData = JSON.parse(localStorage.getItem("LSData"));

    if (LSData && LSData.tokens) {
      const { data } = await axios.post(`${BASE_URL}/refresh/`, {
        refresh: LSData.tokens.refresh,
      });
      localStorage.setItem(
        "LSData",
        JSON.stringify({
          tokens: {
            access: data.access,
            refresh: LSData.tokens.refresh,
          },
          id: LSData.id,
          favorites: LSData.favorites,
        })
      );
      return data.access;
    }
  } catch (error) {
    localStorage.removeItem("LSData");
    console.log(error);
  }
}

export default $axios;
