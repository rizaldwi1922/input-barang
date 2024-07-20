<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\UomBig;
use App\Models\UomSmall;
use App\Models\Category;

class Item extends Model
{
    use HasFactory;

    public static function CreateOrUpdate($request){
        $data = self::findOrNew($request->id);
        $data->barcode = $request->barcode;
        $data->name = $request->name;
        $data->exchange = $request->exchange;
        $data->stock = $request->stock;
        $data->price_selling = $request->price_selling;
        $data->price_purchase = $request->price_purchase;
        $data->category_id = $request->category_id;
        $data->uom_small_id = $request->uom_small_id;
        $data->uom_big_id = $request->uom_big_id;
        $data->save();
        return $data;
    }

    public function uomBig():BelongsTo
    {
        return $this->belongsTo(UomBig::class, 'uom_big_id', 'id');
    }

    public function uomSmall():BelongsTo
    {
        return $this->belongsTo(UomSmall::class, 'uom_small_id', 'id');
    }

    public function category():BelongsTo
    {
        return $this->belongsTo(Category::class, 'uom_small_id', 'id');
    }
}
