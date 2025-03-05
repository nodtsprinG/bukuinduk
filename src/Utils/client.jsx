import axios from "axios";

const client = axios.create({
    baseURL : "http://localhost:8080",
    headers: {
        Authorization : "Bearer " + localStorage.getItem("token")
    }
})

export default client
