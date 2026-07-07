import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, fetchItems } from '../redux/slices/masterDataSlice';
import { fetchOrderById, createOrder, updateOrder } from '../redux/slices/orderSlice';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Table from '../components/Table';

const SalesOrderScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const { clients, items, loadingClients, loadingItems } = useSelector(state => state.masterData);
    const { loading: savingOrder } = useSelector(state => state.sales);

    // Form Inputs (Left Column - Customer & Address)
    const [selectedClient, setSelectedClient] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const [suburb, setSuburb] = useState('');
    const [stateName, setStateName] = useState('');
    const [postCode, setPostCode] = useState('');

    // Form Inputs (Right Column - Invoice Meta)
    const [invoiceNo, setInvoiceNo] = useState('');
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [referenceNo, setReferenceNo] = useState('');

    // Data Grid / Saved Order Lines
    const [orderDetails, setOrderDetails] = useState([]);

    // Current Working Row Inputs (Item Entry Line)
    const [selectedItemCode, setSelectedItemCode] = useState('');
    const [selectedItemDesc, setSelectedItemDesc] = useState('');
    const [note, setNote] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [taxRate, setTaxRate] = useState(10);

    // Load Initial Dropdowns and existing order if editing
    useEffect(() => {
        dispatch(fetchClients());
        dispatch(fetchItems());

        if (id) {
            dispatch(fetchOrderById(id)).unwrap().then(order => {
                setInvoiceNo(order.invoiceNo);
                setInvoiceDate(order.invoiceDate.split('T')[0]);
                setReferenceNo(order.referenceNo || '');
                setSelectedClient(order.clientID.toString());
                setOrderDetails(order.orderDetails || []);
            }).catch(err => console.error(err));
        }
    }, [dispatch, id]);

    // Update Address when clients are loaded AND we are editing an existing order
    useEffect(() => {
        if (clients.length > 0 && selectedClient) {
            const client = clients.find(c => c.clientID === parseInt(selectedClient));
            if (client) {
                setAddress1(client.address1 || '');
                setAddress2(client.address2 || '');
                setAddress3(client.address3 || '');
                setSuburb(client.suburb || '');
                setStateName(client.state || '');
                setPostCode(client.postCode || '');
            }
        }
    }, [clients, selectedClient]);


    // Handle Client Selection & Auto-fill Address manually from dropdown
    const handleClientChange = (e) => {
        const clientId = e.target.value;
        setSelectedClient(clientId);
        const client = clients.find(c => c.clientID === parseInt(clientId));
        if (client) {
            setAddress1(client.address1 || '');
            setAddress2(client.address2 || '');
            setAddress3(client.address3 || '');
            setSuburb(client.suburb || '');
            setStateName(client.state || '');
            setPostCode(client.postCode || '');
        } else {
            setAddress1(''); setAddress2(''); setAddress3(''); setSuburb(''); setStateName(''); setPostCode('');
        }
    };

    // Sync Item Dropdowns (Code <-> Description)
    const handleItemSelect = (e, type) => {
        const value = e.target.value;
        const item = items.find(i => type === 'code' ? i.itemCode === value : i.description === value);
        if (item) {
            setSelectedItemCode(item.itemCode);
            setSelectedItemDesc(item.description);
            setPrice(item.unitPrice);
        } else {
            setSelectedItemCode('');
            setSelectedItemDesc('');
            setPrice(0);
        }
    };

    // Live Calculations for Working Row
    const currentExcl = quantity * price;
    const currentTax = currentExcl * (taxRate / 100);
    const currentIncl = currentExcl + currentTax;

    // Append temporary line to Grid
    const handleAddItem = () => {
        if (!selectedItemCode) return alert("Please select an Item Code or Description!");

        const newItem = {
            itemCode: selectedItemCode,
            description: selectedItemDesc,
            note,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            taxRate: parseFloat(taxRate),
            exclAmount: currentExcl,
            taxAmount: currentTax,
            inclAmount: currentIncl
        };

        setOrderDetails([...orderDetails, newItem]);

        // Reset inputs for next entry
        setSelectedItemCode('');
        setSelectedItemDesc('');
        setNote('');
        setQuantity(1);
        setPrice(0);
    };

    const handleRemoveItem = (index) => {
        setOrderDetails(orderDetails.filter((_, i) => i !== index));
    };

    // Bottom Totals
    const totalExcl = orderDetails.reduce((sum, item) => sum + item.exclAmount, 0);
    const totalTax = orderDetails.reduce((sum, item) => sum + item.taxAmount, 0);
    const totalIncl = orderDetails.reduce((sum, item) => sum + item.inclAmount, 0);

    const handleSaveOrder = () => {
        if (!invoiceNo || !selectedClient || orderDetails.length === 0) {
            return alert("Invoice No, Customer, and at least one Item are required!");
        }

        const payload = {
            orderID: id ? parseInt(id) : 0,
            invoiceNo,
            invoiceDate: new Date(invoiceDate).toISOString(),
            referenceNo,
            clientID: parseInt(selectedClient),
            totalExcl,
            totalTax,
            totalIncl,
            orderDetails
        };

        if (id) {
            dispatch(updateOrder({ id, order: payload })).unwrap()
                .then(() => navigate('/'))
                .catch(err => alert(err.message || 'Error updating order'));
        } else {
            dispatch(createOrder(payload)).unwrap()
                .then(() => navigate('/'))
                .catch(err => alert(err.message || 'Error creating order'));
        }
    };

    const columns = [
        { header: 'Item Code', accessor: 'itemCode' },
        { header: 'Description', accessor: 'description' },
        { header: 'Note', accessor: 'note', render: (row) => <span className="text-gray-500">{row.note || '-'}</span> },
        { header: 'Quantity', accessor: 'quantity', align: 'center', headerAlign: 'center', width: 'w-16' },
        { header: 'Price (Rs)', accessor: 'price', render: (row) => row.price.toFixed(2), width: 'w-20' },
        { header: 'Tax', accessor: 'taxRate', render: (row) => `${row.taxRate}%`, align: 'center', headerAlign: 'center', width: 'w-12' },
        { header: 'Excl Amount', accessor: 'exclAmount', render: (row) => row.exclAmount.toFixed(2), width: 'w-24' },
        { header: 'Tax Amount', accessor: 'taxAmount', render: (row) => row.taxAmount.toFixed(2), width: 'w-24' },
        { header: 'Incl Amount', accessor: 'inclAmount', render: (row) => <span className="font-medium">{row.inclAmount.toFixed(2)}</span>, width: 'w-24' },
        {
            header: 'Action',
            accessor: 'action',
            align: 'center',
            headerAlign: 'center',
            width: 'w-16',
            render: (row, index) => (
                <button onClick={() => handleRemoveItem(index)} className="text-danger hover:underline">Delete</button>
            )
        }
    ];

    const clientOptions = clients.map(c => ({ value: c.clientID.toString(), label: c.customerName }));
    const itemCodeOptions = items.map(i => ({ value: i.itemCode, label: i.itemCode }));
    const itemDescOptions = items.map(i => ({ value: i.description, label: i.description }));

    return (
        <div className="p-6 w-full min-h-screen bg-background font-sans text-sm text-primary selection:bg-primary-light">

            <div className="border border-primary p-4 bg-surface w-full shadow-card rounded-sm">
                {/* Inner Header Row */}
                <div className="border-b border-primary pb-2 mb-4 flex justify-between items-center">
                    <span className="font-medium text-base tracking-wide">Sales Order</span>
                    <Button onClick={() => navigate('/')} variant="secondary">Back to List</Button>
                </div>

                {/* Action Controls */}
                <div className="mb-4 flex gap-2">
                    <Button onClick={handleSaveOrder} disabled={savingOrder}>
                        {savingOrder ? 'Saving...' : '☑ Save Order'}
                    </Button>
                    {id && (
                        <Button onClick={() => window.print()} variant="secondary" className="border-gray-300">
                            🖨 Print Order
                        </Button>
                    )}
                </div>

                {/* Form Split Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-6">
                    {/* LEFT CONTAINER: Customers details */}
                    <div className="space-y-2">
                        <Select label="Customer Name" value={selectedClient} onChange={handleClientChange} options={clientOptions} />
                        <Input label="Address 1" value={address1} onChange={e => setAddress1(e.target.value)} />
                        <Input label="Address 2" value={address2} onChange={e => setAddress2(e.target.value)} />
                        <Input label="Address 3" value={address3} onChange={e => setAddress3(e.target.value)} />
                        <Input label="Suburb" value={suburb} onChange={e => setSuburb(e.target.value)} />
                        <Input label="State" value={stateName} onChange={e => setStateName(e.target.value)} />
                        <Input label="Post Code" value={postCode} onChange={e => setPostCode(e.target.value)} />
                    </div>

                    {/* RIGHT CONTAINER: Invoices Details */}
                    <div className="space-y-2 flex flex-col justify-start">
                        <Input label="Invoice No." value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} />
                        <Input label="Invoice Date" type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} />
                        <Input label="Reference no" value={referenceNo} onChange={e => setReferenceNo(e.target.value)} />
                        
                        {/* Canvas */}
                        <div className="mt-4 border border-primary p-2 min-h-[110px] w-full bg-surface flex items-center justify-center text-xs text-gray-400">
                            [ Empty Comment/Reference Canvas ]
                        </div>
                    </div>
                </div>

                {/* Dynamic Data Injection Control Line */}
                <div className="border border-primary p-2 mb-4 bg-secondary">
                    <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 items-end text-xs">
                        <div className="flex flex-col">
                            <label className="mb-1 font-semibold">Item Code</label>
                            <select value={selectedItemCode} onChange={(e) => handleItemSelect(e, 'code')} className="w-full border border-primary p-1 bg-white outline-none focus:ring-1 focus:ring-primary">
                                <option value="">-- Select --</option>
                                {items.map(i => <option key={i.itemID} value={i.itemCode}>{i.itemCode}</option>)}
                            </select>
                        </div>
                        <div className="sm:col-span-2 flex flex-col">
                            <label className="mb-1 font-semibold">Description</label>
                            <select value={selectedItemDesc} onChange={(e) => handleItemSelect(e, 'desc')} className="w-full border border-primary p-1 bg-white outline-none focus:ring-1 focus:ring-primary">
                                <option value="">-- Select --</option>
                                {items.map(i => <option key={i.itemID} value={i.description}>{i.description}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 font-semibold">Note</label>
                            <input type="text" value={note} onChange={(e) => setNote(e.target.value)} className="w-full border border-primary p-1 bg-white outline-none focus:ring-1 focus:ring-primary" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 font-semibold">Quantity</label>
                            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full border border-primary p-1 bg-white outline-none focus:ring-1 focus:ring-primary" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 font-semibold">Tax (%)</label>
                            <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full border border-primary p-1 bg-white outline-none focus:ring-1 focus:ring-primary" />
                        </div>
                        <Button onClick={handleAddItem} className="h-[26px]">
                            + Add Line
                        </Button>
                    </div>
                </div>

                {/* Central Core Invoice Data Grid */}
                <div className="mb-6">
                    <Table 
                        columns={columns} 
                        data={orderDetails} 
                        loading={false} 
                        emptyMessage="Grid Empty" 
                    />
                </div>

                {/* Absolute Right Terminus Grid Summaries Block */}
                <div className="flex justify-end">
                    <div className="w-80 space-y-2 pt-2">
                        <Input label="Total Excl (Rs.)" readOnly value={totalExcl.toFixed(2)} className="text-right" />
                        <Input label="Total Tax (Rs.)" readOnly value={totalTax.toFixed(2)} className="text-right" />
                        <Input label="Total Incl (Rs.)" readOnly value={totalIncl.toFixed(2)} className="text-right font-bold" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesOrderScreen;