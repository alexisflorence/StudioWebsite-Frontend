import axios from "axios"

class RegisteredDataService {

    // write to DB
    updateRegisteredList(data){
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/classes/registered`, data);
    }

   // get from DB
    getAll(userId){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/classes/registered/${userId}`);
    }

    // deleteRegistered(data) {
    //     return axios.delete(
    //         `${process.env.REACT_APP_API_BASE_URL}/api/v1/classes/registered`, { data });
    // }
}

export default new RegisteredDataService();