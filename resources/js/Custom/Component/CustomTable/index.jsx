import DataTable from "react-data-table-component";
import useTable from "@/Hooks/useTable";
import { customStyles } from "./CustomStyleTable";

export default (props) => {
    const { columns, endpoint, label, routeAdd, routeUpdate, routeDelete, expandComponent = null } =
        props;
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
                        <button
                            onClick={() => api.onUpdate(routeUpdate, row.id)}
                            className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 "
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => api.onDelete(routeDelete, row.id)}
                            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                        >
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
                <div className="hidden sm:block">
                    <div className="relative">
                        <button className="absolute -translate-y-1/2 left-3 top-1/2">
                            <svg
                                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                                    fill=""
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                    fill=""
                                />
                            </svg>
                        </button>

                        <input
                            value={api.search}
                            onChange={e => api.setSearch(e.target.value)}
                            type="text"
                            placeholder="Type to search..."
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-9 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary xl:w-125"
                        />
                    </div>
                </div>

                <button
                    onClick={() => api.onCreate(routeAdd)}
                    className="h-10 px-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 "
                >
                    Tambah Data
                </button>
            </div>

            <div className="flex flex-col mb-5">
                <DataTable
                    customStyles={customStyles}
                    columns={columnsTable}
                    data={api.data}
                    expandableRows={expandComponent ? true : false}
                    expandableRowsComponent={expandComponent}
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
