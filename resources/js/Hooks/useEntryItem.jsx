import { useState } from "react";
import api from "@/Service/api";

const useEntryItem = () => {
    const rest = api;
    const [show, setShow] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [currentData, setCurrentData] = useState({});
    const [isAddMode, setIsAddMode] = useState(false);
    const toggle = () => setShow(!show);
    const item =  {
        barcode: null,
        item_id: null,
        item_name: "",
        uom_type: "SMALL",
        uom: '',
        price: 0,
        qty: 0,
        input_date: null,
        expired_date: null

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
        console.log("select", value)
        setCurrentData({
            ...currentData,
            [name]: value,
        });
    };

    const handleSave = () => {
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
        setCurrentData({
            ...currentData,
            'item_id': res.id,
            'item_name': res.name
        });
        
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
        getItemByBarcode
    }
};

export default useEntryItem;
