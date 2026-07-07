import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clientService, itemService } from '../../services/api';

export const fetchClients = createAsyncThunk('masterData/fetchClients', async () => {
    const response = await clientService.getClients();
    return response.data;
});

export const fetchItems = createAsyncThunk('masterData/fetchItems', async () => {
    const response = await itemService.getItems();
    return response.data;
});

const initialState = {
    clients: [],
    items: [],
    loadingClients: false,
    loadingItems: false,
    error: null,
};

const masterDataSlice = createSlice({
    name: 'masterData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.loadingClients = true;
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.loadingClients = false;
                state.clients = action.payload;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.loadingClients = false;
                state.error = action.error.message;
            })
            .addCase(fetchItems.pending, (state) => {
                state.loadingItems = true;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loadingItems = false;
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loadingItems = false;
                state.error = action.error.message;
            });
    },
});

export default masterDataSlice.reducer;
