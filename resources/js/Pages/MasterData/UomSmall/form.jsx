import React from "react";
import GenericForm from "@/Custom/Component/GenericForm";
import DefaultLayout from "@/Custom/Layout/DefaultLayout";

export default ({UomSmall}) => {

    console.log("test", UomSmall)
    const fields = [
        {
            name: "name",
            label: "Name",
            required: true,
        }
    ];

    const label = UomSmall ? "Edit Satuan Kecil" : "Tambah Satuan Kecil"

    return (
        <DefaultLayout active={23}>
            <GenericForm
                fields={fields}
                initialData={UomSmall}
                routeName="UomSmallUpdate"
                submitButtonLabel={label}
                label={label}
            />
        </DefaultLayout>
    );
};
