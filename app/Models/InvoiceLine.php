<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceLine extends Model
{
    use HasFactory;

    public static function CreateOrUpdate($request){
        $data = self::findOrNew($request->id);
        $data->invoice_id = $request->invoice_id;
        $data->invoice_num = $request->invoice_num;
        $data->item_id = $request->item_id;
        $data->item_barcode = $request->barcode;
        $data->uom_type = $request->uom_type;
        $data->qty = $request->qty;
        $data->price = $request->price;
        $data->input_date = $request->input_date;
        $data->expired_date = $request->expired_date;
        $data->save();
        return $data;
    }
}
