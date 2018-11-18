import axios from "axios";

const performRequest = request => async (dispatch, getState) => {
    const options = {
        baseURL: "http://localhost:5000",
        timeout: 30000
    };

    const requestObject = axios.create(options);
    try {
        return await request(requestObject);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export function post(path, params) {
    return performRequest(requestObject => {
        return requestObject.post(path, params);
    });
}

export function get(path) {
    return performRequest(requestObject => {
        return requestObject.get(path);
    });
}

export function put(path, params) {
    return performRequest(requestObject => {
        return requestObject.put(path, params);
    });
}
