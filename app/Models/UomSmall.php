<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UomSmall extends Model
{
    use HasFactory;

    public static function CreateOrUpdate($request){
        $data = self::findOrNew($request->id);
        $data->name = $request->name;
        $data->save();
        return $data;
    }
}
