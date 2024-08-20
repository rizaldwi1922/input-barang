<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\Item;
use App\Models\Category;
use App\Models\UomBig;
use App\Models\UomSmall;

class ItemController extends Controller
{
    public function index()
    {
        return Inertia::render('MasterData/Item/index');
    }

    public function form()
    {
        return Inertia::render('MasterData/Item/form');
    }

    public function show($id)
    {
        $item = Item::find($id);
        $category = Category::find($item->category_id);
        $big = UomBig::find($item->uom_big_id);
        $small = UomSmall::find($item->uom_small_id);
        $item->category = ['value' => $category->id, 'label' => $category->name];
        $item->uom_big = ['value' => $big->id, 'label' => $big->name];
        $item->uom_small = ['value' => $small->id, 'label' => $small->name];
        return Inertia::render('MasterData/Item/form', ['item' => $item]);
    }

    public function getItem($barcode)
    {
        $item = Item::with('uomBig', 'uomSmall', 'category')->where('barcode', $barcode)->first();
        return $item;
    }

    public function getAllData(Request $request)
    {
        $query = Item::with('uomBig', 'uomSmall', 'category')
            ->where('name', 'LIKE', '%' . $request->search . '%')
            ->paginate($request->itemPerPage, ['*'], 'page', $request->page);
        return $query;
    }

    public function update(Request $request)
    {
        $messages = [
            'required'  => ':Attribute wajib di isi.',
        ];

        $validator = Validator::make($request->all(), [
            'name' => ['required']
        ], $messages);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        //dd($request);
        $data = $request;
        $data['category_id'] = $request->category['value'];
        $data['uom_small_id'] = $request->uom_small['value'];
        $data['uom_big_id'] = $request->uom_big['value'];
        //dd($data);

        Item::CreateOrUpdate($request);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $data = Item::find($id);
        $data->delete();

        return response()->json([
            "data" => '',
            "message" => "Hapus berhasil"
        ], 202);
    }
}
