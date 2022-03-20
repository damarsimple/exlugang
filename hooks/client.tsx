import axios from "axios";
import { useUserStore } from "../stores/useUserStore";

// const KEY = "xFyUvV5FsZen4n1qYsP9tNq6kj4bmRIwCjncwHyg1GQXhRFm";

const token = useUserStore.getState().token;


export const client = axios.create({
  baseURL: "https://console.exluhost.my.id/",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "Application/vnd.pterodactyl.v1+json",
  },
});