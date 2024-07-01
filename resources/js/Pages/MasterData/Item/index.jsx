import DefaultLayout from "@/Custom/Layout/DefaultLayout"
import CustomTable from "@/Custom/Component/CustomTable"

export default () => {

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        }
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