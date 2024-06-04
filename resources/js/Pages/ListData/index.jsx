import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DefaultLayout from "@/Custom/Layout/DefaultLayout";
import axios from "axios";

const MyDarkDataTable = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [rowPerPage, setRowPerPage] = useState(10);
    const [totalItem, setTotalItem] = useState(0);

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleRowPerPageChange = (limit) => {
        setRowPerPage(limit);
    };

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
                minHeight: "72px", // Tinggi minimum baris
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

    const columns = [
        {
            name: "Barcode",
            selector: (row) => row.barcode,
        },
        {
            name: "Nama Barang",
            selector: (row) => row.nama,
            wrap: true,
            width: '200px'
        },
        {
            name: "Isi Kecil",
            selector: (row) => parseInt(row.isi_kecil),
        },
        {
            name: "Satuan Kecil",
            selector: (row) => row.satuan_kecil,
        },
        {
            name: "Isi Besar",
            selector: (row) => parseInt(row.isi_besar),
        },
        {
            name: "Satuan Besar",
            selector: (row) => row.satuan_besar,
        },
        {
            name: "Harga Jual",
            selector: (row) => row.harga_jual,
        },
        {
            name: "Harga Beli",
            selector: (row) => row.harga_beli,
        },
    ];

    useEffect(() => {
        axios
            .get(route("getAllData"), {
                params: {
                    itemPerPage: rowPerPage,
                    page: page,
                },
            })
            .then(function (res) {
                setData(res.data.data);
                setTotalItem(res.data.total);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, [page, rowPerPage]);
    return (
        <DefaultLayout>
            <DataTable
                columns={columns}
                data={data}
                customStyles={customStyles}
                theme={customTheme}
                pagination
                paginationServer
                paginationTotalRows={totalItem}
                paginationPerPage={rowPerPage}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowPerPageChange}
            />
        </DefaultLayout>
    );
};

export default MyDarkDataTable;
