import React from "react";
import GenericForm from "@/Custom/Component/GenericForm";
import DefaultLayout from "@/Custom/Layout/DefaultLayout";
import useCategory from "@/Hooks/useCategory";
import useUomBig from "@/Hooks/useUomBig";
import useUomSmall from "@/Hooks/useUomSmall";

export default ({ item }) => {
    const cat = useCategory();
    const uomBig = useUomBig();
    const uomSmall = useUomSmall();

    const fields = [
        {
            name: "barcode",
            label: "Barcode",
            required: true,
        },
        {
            name: "name",
            label: "Name",
            required: true,
        },
        {
            name: "price_selling_label",
            label: "Harga Jual",
            type: "number",
            required: true,
            rawField: "price_selling",
        },
        {
            name: "price_selling",
            type: "hidden",
        },
        {
            name: "price_purchase_label",
            label: "Harga Beli",
            type: "number",
            required: true,
            rawField: "price_purchase",
        },
        {
            name: "price_purchase",
            type: "hidden",
        },
        { name: "uom_big", label: "Satuan Besar", type: "select", required: true },
        { name: "uom_small", label: "Satuan Kecil", type: "select", required: true },
        {
            name: "exchange_label",
            label: "Nilai Konversi",
            type: "number",
            required: true,
            rawField: "exchange",
        },
        {
            name: "exchange",
            type: "hidden",
        },
        { name: "category", label: "Category", type: "select", required: true },
        {
            name: "stock_label",
            label: "Stok Barang",
            type: "number",
            required: true,
            rawField: "stock",
        },
        {
            name: "stock",
            type: "hidden",
        },
    ];

    const label = item ? "Edit Barang" : "Tambah Barang";

    const selectOptions = {
        category: cat.category?.map(category => ({
            value: category.id,
            label: category.name,
        })),
        uom_big: uomBig.uomBig?.map(big =>({
            value: big.id,
            label: big.name
        })),
        uom_small: uomSmall.uomSmall?.map(small =>({
            value: small.id,
            label: small.name
        }))
    };

    return (
        <DefaultLayout active={20}>
            <GenericForm
                fields={fields}
                initialData={item}
                routeName="ItemUpdate"
                submitButtonLabel={label}
                label={label}
                selectOptions={selectOptions}
            />
        </DefaultLayout>
    );
};
