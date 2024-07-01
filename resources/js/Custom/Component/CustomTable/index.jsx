import DataTable from "react-data-table-component";
import useTable from "@/Hooks/useTable";

export default (props) => {
    const { columns, endpoint, label, routeAdd, routeUpdate, routeDelete } = props;
    const api = useTable(endpoint);
    let columnsTable;

    var firstColumn = [
        {
            name: "No.",
            width: "60px",
            selector: (row, index) =>
                index +
                1 +
                (api.pageTable.page - 1) * api.pageTable.itemPerPage,
        },
    ];



    const actionColumn = [
        {
            name: "Action",
            button: true,
            width: "200px",
            ignoreRowClick: true,
            allowOverflow: true,
            cell: (row) => (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div>
                        <button onClick={() => api.onUpdate(routeUpdate, row.id)} className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 ">
                            Edit
                        </button>
                        <button onClick={() => api.onDelete(routeDelete, row.id)} className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
                            Hapus
                        </button>
                    </div>
                </div>
            ),
        },
    ];

    columnsTable = firstColumn.concat(actionColumn).concat(columns);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
                className="mb-4"
            >
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    {label}
                </h4>
                <button onClick={() => api.onCreate(routeAdd)} className="h-10 px-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 ">
                    Tambah Data
                </button>
            </div>

            <div className="flex flex-col mb-5">
                <DataTable
                    customStyles={api.customStyles}
                    theme={api.customTheme}
                    columns={columnsTable}
                    data={api.data}
                    pagination
                    paginationServer
                    paginationTotalRows={api.totalItem}
                    paginationPerPage={api.pageTable.itemPerPage}
                    onChangePage={api.handlePageChange}
                    onChangeRowsPerPage={api.handleRowPerPageChange}
                />
            </div>
        </div>
    );
};
