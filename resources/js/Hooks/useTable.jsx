import { useEffect, useState } from "react";
import api from "@/Service/api";
import { router } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";

const useTable = (endpoint) => {
    const comp = api;

    const [data, setData] = useState([])
    const [pageTable, setPageTable] = useState({itemPerPage: 10, page: 1})
    const [totalItem, setTotalItem] = useState(0);

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: "#2c3e50", // Warna latar belakang kepala kolom
                color: "#ffffff", // Warna teks kepala kolom
            },
        },
        rows: {
            style: {
                backgroundColor: "#34495e", // Warna latar belakang baris
                color: "#ffffff", // Warna teks baris
                minHeight: "50px", // Tinggi minimum baris
            },
        },
        pagination: {
            style: {
                backgroundColor: "#2c3e50", // Warna latar belakang navigasi halaman
                color: "#ffffff", // Warna teks navigasi halaman
            },
        },
    };

    const customTheme = {
        title: {
            fontSize: "22px", // Ukuran font judul
            fontFamily: "Arial, sans-serif", // Keluarga font judul
            color: "#ffffff", // Warna teks judul
        },
    };

    const handlePageChange = (val) => {
        setPageTable(prev => ({
            ...prev,
            page: val
        }))
    };

    const handleRowPerPageChange = (limit) => {
        setPageTable(prev => ({
            ...prev,
            itemPerPage: limit
        }))
    };

    const get = async() => {
        const res = await comp.fetchDataTable.fetchDataTable(endpoint, pageTable)
        setData(res.data)
        setTotalItem(res.total)
    }

    const onCreate = (routeName) => {
        router.visit(route(routeName), {
            method: 'get',
            preserveState: false,
            preserveScroll: false,
        });
    }

    const onUpdate = (routeName, id) => {
        router.visit(route(routeName, { id: id }), {
            method: "get",
            preserveState: false,
            preserveScroll: false,
        });
    };

    const onDelete = async (routeDeleteName,id) => {
        await Swal.fire({
            title: "Apakah anda yakin akan menghapus data ini?",
            text: "Data akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            console.log(routeDeleteName)
            if (result.isConfirmed) {
                axios
                    .post(route(routeDeleteName, { id: id }))
                    .then((res) => {
                        get();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
            }
        });
    };

    useEffect(() => {
        get()
    },[endpoint, pageTable])

    return {
        get,
        data,
        customStyles,
        customTheme,
        handlePageChange,
        handleRowPerPageChange,
        totalItem,
        pageTable,
        onCreate,
        onUpdate,
        onDelete
    }
}

export default useTable;