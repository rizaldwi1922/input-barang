import DefaultLayout from "@/Custom/Layout/DefaultLayout"
import CustomTable from "@/Custom/Component/CustomTable"
import { formatNumber } from "@/Custom/Component/Function/formatNumber";
import ExpandTable from "./ExpandTable";

export default () => {

    const columns = [
        {
            name: 'Nota',
            selector: row => row.invoice_num,
        },
        {
            name: 'Supplier',
            selector: row => row.supplier,
        },
        {
            name: 'Total',
            selector: row => "Rp. " + formatNumber(row.total_amount)
        },
        {
            name: 'Tanggal Nota',
            selector: row => row.invoice_date,
        },
        {
            name: 'Status',
            selector: row => <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${row.posted === 1 ? 'bg-success text-success' : 'bg-danger text-danger' }`}>{row.posted === 1 ? 'Posted' : 'Not Posted'}</p>,
        },
    ];
    
    return(
        <DefaultLayout active={10}>
            <CustomTable
                endpoint={"EntryItemGetAllData"}
                columns={columns}
                label={"Daftar Barang Masuk"}
                routeAdd={"EntryItemForm"}
                routeUpdate={"ItemShow"}
                routeDelete={"ItemDelete"}
                expandComponent={ExpandTable}
            />
        </DefaultLayout>
    )
}