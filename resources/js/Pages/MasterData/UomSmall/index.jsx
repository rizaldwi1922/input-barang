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
        <DefaultLayout active={23}>
            <CustomTable
                endpoint={"UomSmallGetAllData"}
                columns={columns}
                label={"Daftar Satuan Kecil"}
                routeAdd={"UomSmallAdd"}
                routeUpdate={"UomSmallShow"}
                routeDelete={"UomSmallDelete"}
            />
        </DefaultLayout>
    )
}