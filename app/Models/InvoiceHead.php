<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvoiceHead extends Model
{
    use HasFactory;

    public static function CreateOrUpdate($request){
        $data = self::findOrNew($request->id);
        $data->invoice_num = $request->invoice_num;
        $data->supplier = $request->supplier;
        $data->invoice_date = $request->invoice_date;
        $data->created_user_id = Auth::id();
        $data->save();
        return $data;
    }

    public function line(): HasMany
    {
        return $this->hasMany(InvoiceLine::class, 'invoice_id', 'id');
    }
}
