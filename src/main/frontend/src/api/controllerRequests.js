import axios from "axios";

export const getAllEmployees = async (setState) => {
    await axios.get("http://localhost:8989/employee").then((response) => {
        setState(response.data);
    });
};
