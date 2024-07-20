<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceHead extends Model
{
    use HasFactory;

    public static function CreateOrUpdate($request){
        $data = self::findOrNew($request->id);
        $data->invoice_num = $request->invoice_num;
        $data->supplier = $request->supplier;
        $data->invoice_date = $request->invoice_date;
        $data->save();
        return $data;
    }
}
