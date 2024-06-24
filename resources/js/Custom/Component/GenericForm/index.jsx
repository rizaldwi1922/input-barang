import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const unformatNumber = (value) => {
    return parseFloat(value.replace(/,/g, ""));
};

const GenericForm = ({ fields, initialData, routeName, submitButtonLabel }) => {
    const { data, setData, post, processing, errors } = useForm(
        initialData || {}
    );

    console.log(fields);

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
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route(routeName), {
            data: data,
            preserveScroll: false,
            onSuccess: () => {
                location.reload();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Data berhasil disimpan",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    return (
        <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Input Barang
                    </h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6.5 flex flex-wrap mb-6 -mx-3">
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
                                        <input
                                            type={
                                                field.type === "number"
                                                    ? "text"
                                                    : field.type || "text"
                                            }
                                            id={field.name}
                                            name={field.name}
                                            value={data[field.name] || ""}
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
                                    </div>
                                )}
                            </>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={processing}
                    >
                        {submitButtonLabel}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GenericForm;
