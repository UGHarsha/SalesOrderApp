import React from 'react';

const Table = ({ columns, data, loading, emptyMessage = "No data available.", onRowDoubleClick }) => {
    return (
        <div className="border border-primary overflow-x-auto bg-surface shadow-sm">
            <table className="w-full border-collapse text-xs">
                <thead>
                    <tr className="bg-secondary hover:bg-secondary border-b border-primary font-normal">
                        {columns.map((col, index) => (
                            <th 
                                key={index} 
                                className={`border-r border-primary p-2 font-medium ${col.headerAlign ? `text-${col.headerAlign}` : 'text-left'} ${col.width ? col.width : ''} ${index === columns.length - 1 ? 'border-r-0' : ''}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-primary">
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} className="p-4 text-center text-gray-500 italic bg-secondary">
                                Loading data...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="p-4 text-center text-gray-500 italic bg-secondary">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr 
                                key={rowIndex} 
                                className={`bg-surface hover:bg-secondary-hover transition-colors ${onRowDoubleClick ? 'cursor-pointer' : ''}`}
                                onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(row)}
                            >
                                {columns.map((col, colIndex) => (
                                    <td 
                                        key={colIndex} 
                                        className={`border-r border-primary p-2 ${col.align ? `text-${col.align}` : 'text-left'} ${colIndex === columns.length - 1 ? 'border-r-0' : ''}`}
                                    >
                                        {col.render ? col.render(row, rowIndex) : row[col.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
