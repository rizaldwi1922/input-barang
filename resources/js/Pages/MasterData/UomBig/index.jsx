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
        <DefaultLayout active={22}>
            <CustomTable
                endpoint={"UomBigGetAllData"}
                columns={columns}
                label={"Daftar Satuan Besar"}
                routeAdd={"UomBigAdd"}
                routeUpdate={"UomBigShow"}
                routeDelete={"UomBigDelete"}
            />
        </DefaultLayout>
    )
}