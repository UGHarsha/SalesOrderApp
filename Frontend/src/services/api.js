import axios from 'axios';

const API = axios.create({

    baseURL: 'http://localhost:5213/api',
});

export const clientService = {
    getClients: () => API.get('/clients'),
};

export const itemService = {
    getItems: () => API.get('/items'),
};

export const orderService = {
    getOrders: () => API.get('/orders'),
    getOrderById: (id) => API.get(`/orders/${id}`),
    createOrder: (order) => API.post('/orders', order),
    updateOrder: (id, order) => API.put(`/orders/${id}`, order),
};