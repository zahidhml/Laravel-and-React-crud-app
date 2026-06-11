import axios from "axios";

const api = axios.create({
	baseURL: "http://127.0.0.1:8000/api",
	withCredentials: true,
	headers: {
		accept: "application/json",
		"Content-Type": "application/json",
	},
});

export default api;
