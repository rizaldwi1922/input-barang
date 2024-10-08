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
        <DefaultLayout active={21}>
            <CustomTable
                endpoint={"CategoryGetAllData"}
                columns={columns}
                label={"Daftar Kategori"}
                routeAdd={"CategoryAdd"}
                routeUpdate={"CategoryShow"}
                routeDelete={"CategoryDelete"}
            />
        </DefaultLayout>
    )
}