import Modal from "@/Custom/Component/Modal";

export default (props) => {
    const {
        show,
        handleChange,
        closeModal,
        handleSave,
        currentData,
        onBarcode,
    } = props;

    return (
        <Modal
            show={show}
            onClose={closeModal}
            onSave={handleSave}
            title="Tambah Barang"
        >
            <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="p-6.5 flex flex-wrap -mx-3">
                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-3">
                        <label className="block mb-3 text-black dark:text-white">
                            Barcode
                        </label>
                        <input
                            type="text"
                            name="barcode"
                            onBlur={onBarcode}
                            onChange={handleChange}
                            value={currentData.barcode}
                            placeholder="Barcode"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-3">
                        <label className="block mb-3 text-black dark:text-white">
                            Item
                        </label>
                        <input
                            value={currentData.item_name}
                            readOnly
                            name="item_name"
                            type="text"
                            placeholder="Item Name"
                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-3">
                        <label className="block mb-3 font-medium text-black dark:text-white">
                            Harga
                        </label>
                        <input
                            value={currentData.price}
                            onChange={handleChange}
                            name="price"
                            type="number"
                            placeholder="Disabled label"
                            disabled=""
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-3">
                        <label className="block mb-3 font-medium text-black dark:text-white">
                            Kuantiti
                        </label>
                        <input
                            value={currentData.qty}
                            onChange={handleChange}
                            name="qty"
                            type="number"
                            placeholder="Kuantiti"
                            disabled=""
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:w-1/3 md:mb-3">
                        <label className="block mb-3 font-medium text-black dark:text-white">
                            Tipe Satuan
                        </label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <select
                                name="uom_type"
                                value={currentData.uom_type}
                                onChange={handleChange}
                                className="relative z-20 w-full px-5 py-3 transition bg-transparent border rounded outline-none appearance-none border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary "
                            >
                                <option
                                    value="SMALL"
                                    className="text-body dark:text-bodydark"
                                >
                                    Satuan Kecil
                                </option>
                                <option
                                    value="BIG"
                                    className="text-body dark:text-bodydark"
                                >
                                    Satuan Besar
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full px-3 mb-6 md:w-1/3 md:mb-3">
                        <label className="block mb-3 font-medium text-black dark:text-white">
                            Satuan
                        </label>
                        <input
                            value={currentData.uom}
                            readOnly
                            name="uom"
                            type="text"
                            placeholder="Disabled label"
                            disabled=""
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:w-1/3 md:mb-3">
                        <label className="block mb-3 font-medium text-black dark:text-white">
                            Stok Terakhir
                        </label>
                        <input
                            value={currentData.stockLabel}
                            readOnly
                            name="stockLabel"
                            type="text"
                            placeholder="Disabled label"
                            disabled=""
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:w-1/3 md:mb-3">
                        <label className="block mb-3 font-medium text-black dark:text-white">
                            Kategori
                        </label>
                        <input
                            value={currentData.category}
                            readOnly
                            name="category"
                            type="text"
                            placeholder="Kategori"
                            disabled=""
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:w-1/3 md:mb-3">
                        <label className="block mb-3 text-black dark:text-white">
                            Tanggal Masuk
                        </label>
                        <input
                            type="date"
                            name="input_date"
                            onChange={handleChange}
                            value={currentData.input_date}
                            placeholder="Input Date"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:w-1/3 md:mb-3">
                        <label className="block mb-3 text-black dark:text-white">
                            Tanggal Kadaluarsa
                        </label>
                        <input
                            type="date"
                            name="expired_date"
                            onChange={handleChange}
                            value={currentData.expired_date}
                            placeholder="Expired Date"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
