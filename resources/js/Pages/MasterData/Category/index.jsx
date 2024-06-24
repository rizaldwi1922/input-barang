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
        <DefaultLayout>
            
            <CustomTable
                endpoint={"CategoryGetAllData"}
                columns={columns}
            />
        </DefaultLayout>
    )
}