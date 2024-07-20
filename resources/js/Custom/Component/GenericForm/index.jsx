import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import Select from "react-select";
import { formatNumber } from "../Function/formatNumber";


const unformatNumber = (value) => {
    return parseFloat(value.replace(/,/g, ""));
};

const GenericForm = (props) => {
    const {
        fields,
        initialData,
        routeName,
        submitButtonLabel,
        label,
        selectOptions,
    } = props;

    const { data, setData, post, processing, errors } = useForm(
        initialData || {}
    );

    useEffect(() => {
        if (initialData) {
            const formattedData = { ...initialData };
            fields.forEach((field) => {
                if (field.type === "number" && initialData[field.rawField]) {
                    formattedData[field.name] = formatNumber(
                        initialData[field.rawField].toString()
                    );
                }
            });
            setData(formattedData);
        }
    }, [initialData, fields]);

    const handleChange = (e) => {
        const { name, value, dataset } = e.target;
        if (dataset.type === "numberLabel") {
            const rawFieldName = dataset.rawField;
            const formattedValue = formatNumber(value);
            const rawValue = unformatNumber(value);
            setData((prevData) => ({
                ...prevData,
                [name]: formattedValue,
                [rawFieldName]: rawValue,
            }));
        } else {
            console.log(value);
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route(routeName), {
            data: data,
            preserveScroll: false,
            onSuccess: async () => {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Data berhasil disimpan",
                    showConfirmButton: false,
                    timer: 1500,
                });
                location.reload();
            },
        });
    };


    const handleSelectChange = (selected, actionMeta) => {
        console.log("Haha",selected)
        setData(actionMeta.name, selected ? selected : null);
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "#2d2f35", // Warna latar belakang yang gelap
            borderColor: state.isFocused ? "#6c757d" : "#495057", // Warna border saat fokus
            color: "white", // Warna teks
            minHeight: "38px", // Menyesuaikan tinggi agar sesuai dengan field lainnya
            boxShadow: state.isFocused ? "0 0 0 1px #6c757d" : "none", // Menghilangkan shadow biru default
            "&:hover": {
                borderColor: "#6c757d", // Warna border saat hover
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "white", // Warna teks
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#2d2f35", // Warna latar belakang menu dropdown
            color: "white", // Warna teks di menu dropdown
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#495057" : "#2d2f35", // Warna latar belakang saat dipilih
            color: "white", // Warna teks opsi
            "&:hover": {
                backgroundColor: "#6c757d", // Warna latar belakang saat hover
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#6c757d", // Warna teks placeholder
        }),
        input: (provided) => ({
            ...provided,
            color: "white", // Warna teks input
            "& input": {
                boxShadow: "none", // Menghilangkan shadow biru pada input
            },
        }),
    };

    return (
        <div className="flex flex-col gap-9">
            <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        {label}
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5 flex flex-wrap -mx-3">
                        {fields.map((field, index) => (
                            <>
                                {field.type != "hidden" && (
                                    <div
                                        key={index}
                                        className="w-full px-3 mb-6 md:w-1/2 md:mb-3"
                                    >
                                        <label
                                            htmlFor={field.name}
                                            className="mb-2.5 block text-black dark:text-white"
                                        >
                                            {field.label}
                                        </label>
                                        {field.type != "select" ? (
                                            <>
                                                <input
                                                    type={
                                                        field.type === "number"
                                                            ? "text"
                                                            : field.type ||
                                                              "text"
                                                    }
                                                    id={field.name}
                                                    name={field.name}
                                                    value={
                                                        data[field.name] || ""
                                                    }
                                                    onChange={handleChange}
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    required={field.required}
                                                    data-type={
                                                        field.type === "number"
                                                            ? "numberLabel"
                                                            : field.type
                                                    }
                                                    data-raw-field={
                                                        field.rawField || ""
                                                    }
                                                />
                                                {errors[field.name] && (
                                                    <p className="text-xs italic text-gray-600">
                                                        {errors[field.name]}
                                                    </p>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <Select
                                                    name={field.name}
                                                    options={
                                                        selectOptions[
                                                            field.name
                                                        ]
                                                    }
                                                    onChange={
                                                        handleSelectChange
                                                    }
                                                    value={
                                                        data[
                                                            field.name
                                                        ]
                                                    }
                                                    styles={customStyles}
                                                    isClearable={true}
                                                />
                                            </>
                                        )}
                                        {errors[field.name] && (
                                            <div className="text-danger">
                                                {errors[field.name]}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                    <div className="p-6.5">
                        <button
                            disabled={processing}
                            type="submit"
                            className="flex justify-center p-3 font-medium rounded bg-primary text-gray hover:bg-opacity-90"
                        >
                            {submitButtonLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenericForm;
