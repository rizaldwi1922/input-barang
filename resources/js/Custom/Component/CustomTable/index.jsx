import DataTable from "react-data-table-component";
import { useState } from "react";
import useTable from "@/Hooks/useTable";

export default (props) => {
    
    const { columns, endpoint } = props;
    const api = useTable(endpoint)

    const [data, setData] = useState([]);

    return (
        <div>
            <button onClick={api.get}>tet</button>
            <DataTable
                columns={columns}
                data={data}
            />
        </div>
    );
};
