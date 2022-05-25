import get from "lodash.get";
import React from "react";
import {Link} from "react-router-dom";


// @ts-ignore
// не знаю как нормально тут типизировать
function RowTable({row, columns}) {
    return (
       <tr className="table-tr" key={row.id}>
           {columns.map((column: any) => {
               let tag: any = "span"
               let text = get(row, column.get, "")
               let props: any = {
                   className: column.className || "table-text",
                   children: text
               }
               if (column.link) {
                   tag = Link
                   props.to = column.link.to.replace(":id", row.id)
               }
               return (
                   <td key={column.name} className="table-td">
                       {React.createElement(tag, props)}
                   </td>
               )
           })}
       </tr>
    );
}

export default RowTable;