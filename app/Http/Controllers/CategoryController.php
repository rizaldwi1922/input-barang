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

    public function getAllData(Request $request){
        $query = Category::paginate($request->itemPerPage, ['*'], 'page', $request->page);
        return $query;
    }

    public function update(Request $request){
        $messages = [
            'required'  => ':Attribute wajib di isi.',
            'unique' => ':Attribute sudah ada.',
            'gt' => 'Harga tidak boleh Nol'
        ];

        $validator = Validator::make($request->all(), [
            'nama' => ['required']
        ], $messages);

        if ($validator->fails()) {
            return redirect()->back()
            ->withErrors($validator)
            ->withInput();
        }

        Category::CreateOrUpdate($request);

        return redirect()->back();

    }
}
