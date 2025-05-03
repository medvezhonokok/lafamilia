import axios from "axios";


const client = axios.create({
    baseURL: process.env.REACT_APP_LAFAMILIA_BACKEND_URL + "/api",
    withCredentials: true,
});

export const getUser = (jwtToken) => {
    return client.get('/auth/user', {headers: {'Authorization': `Bearer ${jwtToken}`}})
        .then((response) => response.data)
        .catch((err) => {
            throw err;
        });
};

export const login = (credentials) => {
    return client.post('/auth/login', credentials)
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });
};

export const getLots = () => {
    return client.get('/lots/all')
        .then((response) => response.data)
        .catch((err) => {
            throw err;
        });
};

export const getFlavorDescriptors = () => {
    return client.get('/lots/descriptors')
        .then((response) => response.data)
        .catch((err) => {
            throw err;
        });
}

export const deleteLotById = (lotId, jwtToken) => {
    return client.post(`/lots/delete/${lotId}`, {headers: {'Authorization': `Bearer ${jwtToken}`}})
        .then((response) => response.data)
        .catch((err) => {
            throw err;
        });
}

export const updateLot = (lot, jwtToken) => {
    return client.post(`/lots/update/${lot.id}`, lot, {headers: {'Authorization': `Bearer ${jwtToken}`}})
        .then((response) => response.data)
        .catch((err) => {
            throw err;
        });
}

export const create = (lot, jwtToken) => {
    return client.post('/lots/add', lot, {headers: {'Authorization': `Bearer ${jwtToken}`}})
        .then((response) => response.data)
        .catch((err) => {
            throw err;
        });
}