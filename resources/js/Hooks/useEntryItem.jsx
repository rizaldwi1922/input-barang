import { useState } from "react";
import api from "@/Service/api";
import Swal from "sweetalert2";

const useEntryItem = () => {
    const rest = api;
    const [show, setShow] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [currentData, setCurrentData] = useState({});
    const [isAddMode, setIsAddMode] = useState(false);
    const [invoice, setInvoice] = useState({
        invoice_num: '',
        supplier: '',
        invoice_date: null
    })
    const toggle = () => setShow(!show);
    const item =  {
        barcode: null,
        item_id: null,
        item_name: "",
        uom_type: "SMALL",
        uom_big: "",
        uom_small: "",
        uom: '',
        stock: 0,
        stockLabel: "",
        price: 0,
        qty: 0,
        input_date: null,
        expired_date: null,
        category: '',
        exchange: 1

    }
    const [itemList, setItemList] = useState([]);

    const onEdit = (idx) => {
        setSelectedIndex(idx);
        setCurrentData(itemList[idx]);
        setIsAddMode(false);
        toggle();
    };

    const handleDelete = (index) => {
        const updatedData = itemList.filter((_, i) => i !== index);
        setItemList(updatedData);
    };

    const handleAdd = () => {
        setCurrentData(item);
        setIsAddMode(true);
        toggle();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name == "uom_type"){
            let stockLabel = "";
            let uom = "";
            if(value == "SMALL"){
                stockLabel = `${currentData.stock} ${currentData.uom_small}`
                uom = currentData.uom_small
            } else {
                stockLabel = displayUomBig(currentData.stock, currentData.exchange, currentData.uom_big)
                uom = currentData.uom_big
            }
            setCurrentData({
                ...currentData,
                [name]: value,
                'stockLabel': stockLabel,
                'uom': uom
            });
        } else {
            setCurrentData({
                ...currentData,
                [name]: value,
            });
        }
    };

    const handleChangeInvoice = (e) => {
        const { name, value } = e.target;
        setInvoice({
            ...invoice,
            [name]: value,
        });
    };

    const valiedateLineItem = (obj, requiredFields) => {
        for (const field of requiredFields) {
            if (obj[field] === undefined || obj[field] === null || obj[field] === '') {
                return {'field': field, status: false};
            }
        }
        return {status: true};
    }

    const handleSave = () => {
        const requiredFields = [
            'barcode', 'item_id', 'item_name', 'uom_type', 'uom_big',
            'uom_small', 'uom', 'stock', 'stockLabel', 'price', 'qty',
            'input_date', 'expired_date', 'category', 'exchange'
        ];

        const validate = valiedateLineItem(currentData, requiredFields)
        if(!validate.status){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${validate.field} Harus Diisi`,
              });
            return false
        }
        const updatedData = [...itemList];
        if (isAddMode) {
            updatedData.push(currentData);
        } else {
            updatedData[selectedIndex] = currentData;
        }
        setItemList(updatedData);
        toggle();
        setSelectedIndex(null);
        setCurrentData(item);
    };


    const getItemByBarcode = async(e) => {
        const barcode = e.target.value;
        const res = await rest.ItemEntry.getItemByBarcode(barcode);
        
        let stockLabel = "";
        let uom = ""
        if(currentData.uom_type == "SMALL"){
            stockLabel = `${res.stock} ${res.uom_small.name}`
            uom = res.uom_small.name
        } else {
            stockLabel = displayUomBig(res.stock, res.exchange, res.uom_big.name)
            uom = res.uom_big.name
        }

        setCurrentData({
            ...currentData,
            'item_id': res.id,
            'item_name': res.name,
            'uom_big': res.uom_big.name,
            'uom_small': res.uom_small.name,
            'uom': uom,
            'stock': res.stock,
            'stockLabel': stockLabel,
            'category': res.category.name,
            'exchange': res.exchange
        });
        
    }

    const displayUomBig = (stock, exchange, label) => {
        const uom_big = Math.floor(stock / exchange)
        const uom_small = stock % exchange;

        if(uom_big < 1 && uom_small > 0){
            return "< 1 " + label
        } else if(uom_big > 1 && uom_small < 1) {
            return `${uom_big} ${label}`
        } else {
            return `> ${uom_big} ${label}`
        }
    }

    const insertItem = async() => {

        const requiredFields = [
            'invoice_num', 'invoice_date', 'supplier'
        ];

        const validate = valiedateLineItem(invoice, requiredFields)
        if(!validate.status){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${validate.field} Harus Diisi`,
              });
            return false
        }
        const data = {
            'head': invoice,
            'line': itemList
        }

        console.log(data)

        const res = await rest.ItemEntry.insertData(data)
    }

    const closeModal = () => {
        toggle();
        setSelectedIndex(null);
        setCurrentData(item);
    };

    return {
        show,
        selectedIndex,
        currentData,
        isAddMode,
        toggle,
        itemList,
        onEdit,
        handleDelete,
        handleAdd,
        handleChange,
        handleSave,
        closeModal,
        getItemByBarcode,
        insertItem,
        invoice,
        handleChangeInvoice
    }
};

export default useEntryItem;
