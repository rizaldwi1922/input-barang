<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(){
        return Inertia::render('MasterData/Category/index');
    }

    public function form(){
        return Inertia::render('MasterData/Category/form');
    }

    public function show($id){
        $category = Category::find($id);
        return Inertia::render('MasterData/Category/form', ['category' => $category]);
    }

    public function getAllData(Request $request){
        $query = Category::where('name', 'LIKE', '%' . $request->search . '%')->paginate($request->itemPerPage, ['*'], 'page', $request->page);
        return $query;
    }

    public function getAllRawData(){
        $query = Category::get();
        return $query;
    }

    public function update(Request $request){
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

        Category::CreateOrUpdate($request);

        return redirect()->back();

    }

    public function destroy($id){
        $data = Category::find($id);
        $data->delete();

        return response()->json([
            "data" => '',
            "message" => "Hapus berhasil"
        ], 202);
    }
}
