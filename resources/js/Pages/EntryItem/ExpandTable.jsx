import DataTable from "react-data-table-component";
import { customStyles } from "@/Custom/Component/CustomTable/CustomStyleTable";
import { formatNumber } from "@/Custom/Component/Function/formatNumber";

const ExpandTable = (props) => {
    const { data } = props;
    const columns = [
        {
            name: "Barcode",
            selector: (row) => row.item_barcode,
        },
        {
            name: "Nama Barang",
            selector: (row) => row.item.name,
        },
        {
            name: "Harga",
            selector: (row) => "Rp. " + formatNumber(row.price.toString()),
        },
        {
            name: "Jumlah",
            selector: (row) => row.qty,
        },
        {
            name: "Satuan",
            selector: (row) => row.uom_type === "SMALL" ? row.item.uom_small.name : row.item.uom_big.name
        },
    ];

    return (
        <div className="p-5" style={{backgroundColor:'#55679C'}}>
            <DataTable columns={columns} data={data.line} customStyles={customStyles}/>
        </div>
    );
};

export default ExpandTable;
