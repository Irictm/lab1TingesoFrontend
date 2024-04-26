import httpClient from "../http-common"

const getAllByRepair = id_repair => {
    return httpClient.get(`/api/v1/operation/repair/${id_repair}`);
}

const create = data => {
    return httpClient.post('/api/v1/operation/', data);
}

const get = id => {
    return httpClient.get(`/api/v1/operation/${id}`);
}

const update = data => {
    return httpClient.put('/api/v1/operation/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/operation/${id}`);
}
export default { getAllByRepair, create, get, update, remove };