import React from "react";
import RowTable from "./RowTable";

type typedColumns = {
    name: string,
    title: string,
    get: string,
    className?: string,
    link?: {
        to: string
    }
}

interface typedTable<T> {
    row: T[],
    columns: typedColumns[]
}

function Table<T>({columns, row}:typedTable<T>) {

    return (
        <div className="table-wrapper">
            <table className="table">
                <thead className="table-thead">
                   <tr className="table-tr">
                       {columns.map(item => (
                           <th key={item.name} className="table-th">{item.title}</th>
                       ))}
                   </tr>
                </thead>
                <tbody className="table-tbody">
                   {row.map((item: any) => (
                       <RowTable key={item.id} row={item} columns={columns}/>
                   ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;