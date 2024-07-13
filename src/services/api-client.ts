import axios, { CanceledError } from "axios";


export default axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"  // replace with your API URL
});

export { CanceledError };