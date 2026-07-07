import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../services/api';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await orderService.getOrders();
    return response.data;
});

export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (id) => {
    const response = await orderService.getOrderById(id);
    return response.data;
});

export const createOrder = createAsyncThunk('orders/createOrder', async (order) => {
    const response = await orderService.createOrder(order);
    return response.data;
});

export const updateOrder = createAsyncThunk('orders/updateOrder', async ({ id, order }) => {
    const response = await orderService.updateOrder(id, order);
    return response.data;
});

const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orders.findIndex(o => o.orderID === action.payload.orderID);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
                state.currentOrder = action.payload;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;