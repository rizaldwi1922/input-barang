import React from "react";
import GenericForm from "@/Custom/Component/GenericForm";
import DefaultLayout from "@/Custom/Layout/DefaultLayout";

export default () => {
    const fields = [
        {
            name: "name",
            label: "Name",
            required: true,
        },
        {
            name: "name",
            label: "Name",
            required: true,
        },
        {
            name: "name",
            label: "Name",
            required: true,
        },
        {
            name: "name",
            label: "Name",
            required: true,
        },
        { name: 'salaryLabel', label: 'Salary', type: 'number', required: true, rawField: 'salary' },
        { name: 'salary', type: 'hidden' },
        { name: 'gajiLabel', label: 'Gaji', type: 'number', required: true, rawField: 'gaji' },
        { name: 'gaji', type: 'hidden' },
    ];

    return (
        <DefaultLayout>
            <h1>Create User</h1>
            <GenericForm
                fields={fields}
                routeName="CategoryUpdate"
                submitButtonLabel="Create User"
            />
        </DefaultLayout>
    );
};
