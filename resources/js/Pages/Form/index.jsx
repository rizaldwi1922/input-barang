import React, { useState } from "react";
import DefaultLayout from "@/Custom/Layout/DefaultLayout";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "@inertiajs/react";
//import { usePage } from '@inertiajs/inertia-react';
import Select from "react-select";

export default ({ kategori, satuanBesar, satuanKecil }) => {

    const [hargaJual, setHargaJual] = useState('0')
    const [hargaBeli, setHargaBeli] = useState('0')
    const [selectedKategori, setSelectedKategori] = useState(null)
    const [selectedSatuanKecil, setSelectedSatuanKecil] = useState(null)
    const [selectedSatuanBesar, setSelectedSatuanBesar] = useState(null)

    //const { errors } = usePage().props;

    const kategoriList = kategori.map((item) => ({
        value: item.kode,
        label: item.kode,
    }));

    const satuanBesarList = satuanBesar.map((item) => ({
        value: item.nama,
        label: item.nama
    }))

    const satuanKecilList = satuanKecil.map((item) => ({
        value: item.nama,
        label: item.nama
    }))

    const { data, setData, post, processing, errors, reset } = useForm({
        barcode: "",
        nama: "",
        kategori: "",
        isi_satuan_kecil: 0,
        satuan_kecil: "",
        isi_satuan_besar: 0,
        satuan_besar: "",
        harga_jual: 0,
        harga_beli: 0,
    });

    const formatNumber = (value) => {
        // Menggunakan fungsi Intl.NumberFormat untuk memisahkan ribuan
        return new Intl.NumberFormat().format(value);
    };

    const handleChangeHargaJual = (e) => {
        const cleanedValue = e.target.value.replace(/\D/g, "");
        const formattedValue = formatNumber(cleanedValue);
        setHargaJual(formattedValue)
        setData('harga_jual', parseFloat(cleanedValue))

    };

    const handleChangeHargaBeli= (e) => {
        const cleanedValue = e.target.value.replace(/\D/g, "");
        const formattedValue = formatNumber(cleanedValue);
        setHargaBeli(formattedValue)
        setData('harga_beli', parseFloat(cleanedValue))

    };

    const handleChangeKategori = (selected) => {
        setSelectedKategori(selected)
        const val = selected ? selected.value : ""
        setData('kategori', val)
    }

    const handleChangeSatuanKecil = (selected) => {
        setSelectedSatuanKecil(selected)
        const val = selected ? selected.value : ""
        setData('satuan_kecil', val)
    }

    const handleChangeSatuanBesar = (selected) => {
        setSelectedSatuanBesar(selected)
        const val = selected ? selected.value : ""
        setData('satuan_besar', val)
    }

    const onChangeBarcode = async (val) => {
        await axios
            .post(route("getData"), {
                barcode: val,
            })
            .then((res) => {
                const response = res.data;
                if(response){
                    setSelectedKategori({label: response.kategori, value: response.kategori})
                    setSelectedSatuanKecil({label: response.satuan, value: response.satuan})
                    setSelectedSatuanBesar({label: response.satuanbeli, value: response.satuanbeli})
                }
                setData({
                    barcode: data.barcode,
                    nama: response.nama,
                    kategori: response.kategori,
                    isi_satuan_kecil: response.isi2,
                    satuan_kecil: response.satuan,
                    isi_satuan_besar: response.isi,
                    satuan_besar: response.satuanbeli,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onChangeKategori = (val) => {
        setData("kategori", val);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("store"), {
            preserveScroll: false,
            onSuccess: () => {
                //reset();
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

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: '#2d2f35', // Warna latar belakang yang gelap
          borderColor: state.isFocused ? '#6c757d' : '#495057', // Warna border saat fokus
          color: 'white', // Warna teks
          minHeight: '38px', // Menyesuaikan tinggi agar sesuai dengan field lainnya
          boxShadow: state.isFocused ? '0 0 0 1px #6c757d' : 'none', // Menghilangkan shadow biru default
          '&:hover': {
            borderColor: '#6c757d', // Warna border saat hover
          },
        }),
        singleValue: (provided) => ({
          ...provided,
          color: 'white', // Warna teks
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: '#2d2f35', // Warna latar belakang menu dropdown
          color: 'white', // Warna teks di menu dropdown
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#495057' : '#2d2f35', // Warna latar belakang saat dipilih
          color: 'white', // Warna teks opsi
          '&:hover': {
            backgroundColor: '#6c757d', // Warna latar belakang saat hover
          },
        }),
        placeholder: (provided) => ({
          ...provided,
          color: '#6c757d', // Warna teks placeholder
        }),
        input: (provided) => ({
          ...provided,
          color: 'white', // Warna teks input
          '& input': {
            boxShadow: 'none', // Menghilangkan shadow biru pada input
          },
        }),
      };

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Input Barang
                        </h3>
                    </div>
                    <form onSubmit={submit}>
                        {/* <Link href={route('qr')}>Test</Link> */}
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Barcode
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Barcode"
                                        value={data.barcode}
                                        onChange={(e) =>
                                            setData("barcode", e.target.value)
                                        }
                                        onBlur={(e) =>
                                            onChangeBarcode(e.target.value)
                                        }
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                     {errors.barcode && <span style={{color: 'red'}}>{errors.barcode}</span>}
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nama Barang
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nama Barang"
                                        onChange={(e) =>
                                            setData("nama", e.target.value)
                                        }
                                        value={data.nama}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                     {errors.nama && <span style={{color: 'red'}}>{errors.nama}</span>}
                                </div>
                            </div>
                            {/* <SelectGroup
                                value={data.kategori}
                                onChange={onChangeKategori}
                            /> */}
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    {" "}
                                    Kategori
                                </label>

                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <Select
                                        styles={customStyles}
                                        options={kategoriList}
                                        isClearable={true}
                                        value={selectedKategori}
                                        onChange={handleChangeKategori}
                                    />
                                    {errors.kategori && <span style={{color: 'red'}}>{errors.kategori}</span>}
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Isi Satuan Kecil
                                    </label>
                                    <input
                                        type="number"
                                        value={data.isi_satuan_kecil}
                                        onChange={(e) =>
                                            setData(
                                                "isi_satuan_kecil",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Isi Satuan Kecil"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Satuan Kecil
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        options={satuanKecilList}
                                        isClearable={true}
                                        value={selectedSatuanKecil}
                                        onChange={handleChangeSatuanKecil}
                                    />
                                    {/* <input
                                        value={data.satuan_kecil}
                                        onChange={(e) => data.satuan_kecil}
                                        type="text"
                                        placeholder="Satuan Kecil"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    /> */}
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Isi Satuan besar
                                    </label>
                                    <input
                                        value={data.isi_satuan_besar}
                                        onChange={(e) =>
                                            setData(
                                                "isi_satuan_besar",
                                                e.target.value
                                            )
                                        }
                                        type="number"
                                        placeholder="Isi Satuan Besar"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Satuan Besar
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        options={satuanBesarList}
                                        isClearable={true}
                                        value={selectedSatuanBesar}
                                        onChange={handleChangeSatuanBesar}
                                    />
                                    {/* <input
                                        value={data.satuan_besar}
                                        onChange={(e) => data.satuan_besar}
                                        type="text"
                                        placeholder="Satuan Besar"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    /> */}
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Harga Jual
                                    </label>
                                    <input
                                        onChange={handleChangeHargaJual}
                                        value={hargaJual}
                                        type="text"
                                        placeholder="Harga Jual"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Harga Beli
                                    </label>
                                    <input
                                        value={hargaBeli}
                                        onChange={handleChangeHargaBeli}
                                        type="text"
                                        placeholder="Harga Beli"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="flex justify-center w-full p-3 font-medium rounded bg-primary text-gray hover:bg-opacity-90"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

const SelectGroup = ({ value, onChange }) => {
    const [isOptionSelected, setIsOptionSelected] = useState(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    return (
        <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
                {" "}
                Kategori
            </label>

            <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        changeTextColor();
                    }}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                        isOptionSelected ? "text-black dark:text-white" : ""
                    }`}
                >
                    <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                    >
                        Pilih Kategori
                    </option>
                    <option
                        value="ALAT LISTRIK"
                        className="text-body dark:text-bodydark"
                    >
                        ALAT LISTRIK
                    </option>
                    <option
                        value="MINUMAN"
                        className="text-body dark:text-bodydark"
                    >
                        MINUMAN
                    </option>
                    <option
                        value="SUSU"
                        className="text-body dark:text-bodydark"
                    >
                        SUSU
                    </option>
                    <option
                        value="TEH & KOPI"
                        className="text-body dark:text-bodydark"
                    >
                        TEH & KOPI
                    </option>
                    <option
                        value="ROKOK"
                        className="text-body dark:text-bodydark"
                    >
                        ROKOK
                    </option>
                    <option
                        value="TEPUNG"
                        className="text-body dark:text-bodydark"
                    >
                        TEPUNG
                    </option>
                    <option
                        value="SABUN & SAMPHOO"
                        className="text-body dark:text-bodydark"
                    >
                        SABUN & SAMPHOO
                    </option>
                    <option
                        value="PARFUM"
                        className="text-body dark:text-bodydark"
                    >
                        PARFUM
                    </option>
                    <option
                        value="BISKUIT"
                        className="text-body dark:text-bodydark"
                    >
                        BISKUIT
                    </option>
                    <option
                        value="MANISAN"
                        className="text-body dark:text-bodydark"
                    >
                        MANISAN
                    </option>
                    <option
                        value="BUMBU"
                        className="text-body dark:text-bodydark"
                    >
                        BUMBU
                    </option>
                    <option
                        value="ELEKTRONIK"
                        className="text-body dark:text-bodydark"
                    >
                        ELEKTRONIK
                    </option>
                    <option
                        value="MAKANAN KALENG"
                        className="text-body dark:text-bodydark"
                    >
                        MAKANAN KALENG
                    </option>
                    <option
                        value="SYRUP"
                        className="text-body dark:text-bodydark"
                    >
                        SYRUP
                    </option>
                    <option
                        value="DETERGEN"
                        className="text-body dark:text-bodydark"
                    >
                        DETERGEN
                    </option>
                    <option
                        value="KOSMETIK"
                        className="text-body dark:text-bodydark"
                    >
                        KOSMETIK
                    </option>
                    <option
                        value="SNACK"
                        className="text-body dark:text-bodydark"
                    >
                        SNACK
                    </option>
                    <option
                        value="COKELAT"
                        className="text-body dark:text-bodydark"
                    >
                        COKELAT
                    </option>
                    <option
                        value="ALAT RUMAH TANGGA"
                        className="text-body dark:text-bodydark"
                    >
                        ALAT RUMAH TANGGA
                    </option>
                    <option
                        value="OBATAN"
                        className="text-body dark:text-bodydark"
                    >
                        OBATAN
                    </option>
                    <option
                        value="MAKANAN"
                        className="text-body dark:text-bodydark"
                    >
                        MAKANAN
                    </option>
                    <option
                        value="PERMEN"
                        className="text-body dark:text-bodydark"
                    >
                        PERMEN
                    </option>
                    <option
                        value="MENTEGA"
                        className="text-body dark:text-bodydark"
                    >
                        MENTEGA
                    </option>
                    <option
                        value="BEER"
                        className="text-body dark:text-bodydark"
                    >
                        BEER
                    </option>
                    <option
                        value="MIE"
                        className="text-body dark:text-bodydark"
                    >
                        MIE
                    </option>
                    <option
                        value="TISSUE"
                        className="text-body dark:text-bodydark"
                    >
                        TISSUE
                    </option>
                    <option
                        value="TANDAS"
                        className="text-body dark:text-bodydark"
                    >
                        TANDAS
                    </option>
                    <option
                        value="MINYAK GORENG"
                        className="text-body dark:text-bodydark"
                    >
                        MINYAK GORENG
                    </option>
                    <option
                        value="STATIONERY"
                        className="text-body dark:text-bodydark"
                    >
                        STATIONERY
                    </option>
                    <option
                        value="KECAP & SAUCE"
                        className="text-body dark:text-bodydark"
                    >
                        KECAP & SAUCE
                    </option>
                    <option
                        value="PECAH BELAH"
                        className="text-body dark:text-bodydark"
                    >
                        PECAH BELAH
                    </option>
                    <option
                        value="PRODUCT BAYI"
                        className="text-body dark:text-bodydark"
                    >
                        PRODUCT BAYI
                    </option>
                    <option
                        value="MINYAK RAMBUT"
                        className="text-body dark:text-bodydark"
                    >
                        MINYAK RAMBUT
                    </option>
                    <option
                        value="PAMPERS"
                        className="text-body dark:text-bodydark"
                    >
                        PAMPERS
                    </option>
                    <option
                        value="PASTA & S-GIGI"
                        className="text-body dark:text-bodydark"
                    >
                        PASTA & S-GIGI
                    </option>
                    <option
                        value="LAIN-LAIN"
                        className="text-body dark:text-bodydark"
                    >
                        LAIN-LAIN
                    </option>
                    <option
                        value="PEMBALUT WANITA"
                        className="text-body dark:text-bodydark"
                    >
                        PEMBALUT WANITA
                    </option>
                    <option
                        value="MAKANAN BAYI"
                        className="text-body dark:text-bodydark"
                    >
                        MAKANAN BAYI
                    </option>
                    <option
                        value="GULAPUTIH"
                        className="text-body dark:text-bodydark"
                    >
                        GULAPUTIH
                    </option>
                    <option
                        value="KAPAS"
                        className="text-body dark:text-bodydark"
                    >
                        KAPAS
                    </option>
                    <option
                        value="BERAS"
                        className="text-body dark:text-bodydark"
                    >
                        BERAS
                    </option>
                    <option
                        value="SEMIR SEPATU"
                        className="text-body dark:text-bodydark"
                    >
                        SEMIR SEPATU
                    </option>
                    <option
                        value="KACANG TANAH"
                        className="text-body dark:text-bodydark"
                    >
                        KACANG TANAH
                    </option>
                    <option
                        value="SLAI/JAM"
                        className="text-body dark:text-bodydark"
                    >
                        SLAI/JAM
                    </option>
                    <option
                        value="MAKANAN PAGI"
                        className="text-body dark:text-bodydark"
                    >
                        MAKANAN PAGI
                    </option>
                    <option value="ES" className="text-body dark:text-bodydark">
                        ES
                    </option>
                    <option
                        value="PAKAIAN"
                        className="text-body dark:text-bodydark"
                    >
                        PAKAIAN
                    </option>
                    <option
                        value="KONSINYASI"
                        className="text-body dark:text-bodydark"
                    >
                        KONSINYASI
                    </option>
                    <option
                        value="JAS HUJAN"
                        className="text-body dark:text-bodydark"
                    >
                        JAS HUJAN
                    </option>
                    <option
                        value="PEMBERSIH"
                        className="text-body dark:text-bodydark"
                    >
                        PEMBERSIH
                    </option>
                    <option
                        value="DIET FOOD"
                        className="text-body dark:text-bodydark"
                    >
                        DIET FOOD
                    </option>
                    <option
                        value="ALAT BANGUNAN"
                        className="text-body dark:text-bodydark"
                    >
                        ALAT BANGUNAN
                    </option>
                    <option
                        value="MAKANAN HEWAN"
                        className="text-body dark:text-bodydark"
                    >
                        MAKANAN HEWAN
                    </option>
                </select>

                {/* <span className="absolute z-30 -translate-y-1/2 top-1/2 right-4">
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                  fill=""
                ></path>
              </g>
            </svg>
          </span> */}
            </div>
        </div>
    );
};
