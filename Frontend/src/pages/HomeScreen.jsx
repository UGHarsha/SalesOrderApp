import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/slices/orderSlice';
import Button from '../components/Button';
import Table from '../components/Table';

const SalesOrderListScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.sales);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const columns = [
        { header: 'Invoice No', accessor: 'invoiceNo', width: 'w-28' },
        { 
            header: 'Invoice Date', 
            accessor: 'invoiceDate',
            width: 'w-32',
            render: (row) => new Date(row.invoiceDate).toLocaleDateString() 
        },
        { 
            header: 'Customer Name', 
            accessor: 'customerName',
            render: (row) => row.customerName ? `${row.customerName} (ID: ${row.clientID})` : `Client ID: ${row.clientID}`
        },
        { 
            header: 'Reference No', 
            accessor: 'referenceNo',
            width: 'w-32',
            render: (row) => row.referenceNo || '-'
        },
        { 
            header: 'Total Excl (Rs.)', 
            accessor: 'totalExcl',
            width: 'w-28',
            align: 'right',
            headerAlign: 'right',
            render: (row) => row.totalExcl?.toFixed(2)
        },
        { 
            header: 'Total Tax (Rs.)', 
            accessor: 'totalTax',
            width: 'w-24',
            align: 'right',
            headerAlign: 'right',
            render: (row) => row.totalTax?.toFixed(2)
        },
        { 
            header: 'Total Incl (Rs.)', 
            accessor: 'totalIncl',
            width: 'w-28',
            align: 'right',
            headerAlign: 'right',
            render: (row) => <span className="font-medium">{row.totalIncl?.toFixed(2)}</span>
        },
        {
            header: 'Action',
            accessor: 'action',
            width: 'w-32',
            align: 'center',
            headerAlign: 'center',
            render: (row) => (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => navigate(`/order/${row.orderID}`)}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Edit
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                        onClick={() => window.print()}
                        className="text-gray-600 hover:underline font-medium"
                    >
                        Print
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="p-6 w-full min-h-screen bg-background font-sans text-sm text-primary selection:bg-primary-light">
            <div className="border border-primary p-4 bg-surface w-full shadow-card rounded-sm">
                <div className="border-b border-primary pb-2 mb-4 flex justify-between items-center bg-surface">
                    <span className="font-medium text-base tracking-wide">Home</span>
                    <Button onClick={() => navigate('/order')}>
                        ✚ Add New
                    </Button>
                </div>

                {error && <div className="text-danger mb-4">Error loading orders: {error}</div>}

                <Table 
                    columns={columns} 
                    data={orders} 
                    loading={loading} 
                    emptyMessage="No active sales orders recorded in database." 
                    onRowDoubleClick={(row) => navigate(`/order/${row.orderID}`)}
                />

                <div className="mt-3 text-right text-xs text-gray-500">
                    Total Counter: <span className="font-bold text-primary border border-primary px-1.5 py-0.5 bg-secondary">{orders.length}</span> Records
                </div>
            </div>
        </div>
    );
};

export default SalesOrderListScreen;