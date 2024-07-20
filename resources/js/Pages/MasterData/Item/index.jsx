import DefaultLayout from "@/Custom/Layout/DefaultLayout"
import CustomTable from "@/Custom/Component/CustomTable"
import { formatNumber } from "@/Custom/Component/Function/formatNumber";

export default () => {

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Harga Beli',
            selector: row => formatNumber(row.price_purchase.toString())
        },
        {
            name: 'Harga Jual',
            selector: row => formatNumber(row.price_selling.toString())
        },
        {
            name: 'Kategori',
            selector: row => row.category.name,
        },
        {
            name: 'Stock',
            selector: row => row.stock,
        },
    ];

    return(
        <DefaultLayout active={20}>
            <CustomTable
                endpoint={"ItemGetAllData"}
                columns={columns}
                label={"Daftar Barang"}
                routeAdd={"ItemAdd"}
                routeUpdate={"ItemShow"}
                routeDelete={"ItemDelete"}
            />
        </DefaultLayout>
    )
}