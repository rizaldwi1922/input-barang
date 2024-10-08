import React from "react";
import GenericForm from "@/Custom/Component/GenericForm";
import DefaultLayout from "@/Custom/Layout/DefaultLayout";

export default ({category}) => {

    const fields = [
        {
            name: "name",
            label: "Name",
            required: true,
        }
    ];

    const label = category ? "Edit Kategori" : "Tambah Kategori"

    return (
        <DefaultLayout active={21}>
            <GenericForm
                fields={fields}
                initialData={category}
                routeName="CategoryUpdate"
                submitButtonLabel={label}
                label={label}
            />
        </DefaultLayout>
    );
};
