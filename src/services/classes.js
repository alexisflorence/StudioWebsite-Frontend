import axios from "axios";

class ClassDataService {

    getAll(page = 0){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/classes?page=${page}`);
    }

    find(query, by="title", page=0){
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/classes?${by}=${query}&page=${page}`
        );
    }

    get(classId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/classes/id/${classId}`);
    }

    getByIdList(idList) {
        let listString = JSON.stringify(idList);
        let url = `${process.env.REACT_APP_API_BASE_URL}/api/v1/classes/idList/${listString}`
        // let url = `${process.env.REACT_APP_API_BASE_URL}/api/v1/classes/registered/${listString}`
        return axios.get(url);
      }

    getDay(){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/classes/day`);
    }

}

export default new ClassDataService();

// MATCHES