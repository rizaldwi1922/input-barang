import React from "react";
import GenericForm from "@/Custom/Component/GenericForm";
import DefaultLayout from "@/Custom/Layout/DefaultLayout";

export default ({UomBig}) => {

    const fields = [
        {
            name: "name",
            label: "Name",
            required: true,
        }
    ];

    const label = UomBig ? "Edit Satuan Besar" : "Tambah Satuan Besar"

    return (
        <DefaultLayout active={22}>
            <GenericForm
                fields={fields}
                initialData={UomBig}
                routeName="UomBigUpdate"
                submitButtonLabel={label}
                label={label}
            />
        </DefaultLayout>
    );
};
