<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\UomSmall;
use Illuminate\Support\Facades\Validator;

class UomSmallController extends Controller
{
    public function index(){
        return Inertia::render('MasterData/UomSmall/index');
    }

    public function form(){
        return Inertia::render('MasterData/UomSmall/form');
    }

    public function show($id){
        $uomSmall = UomSmall::find($id);
        return Inertia::render('MasterData/UomSmall/form', ['UomSmall' => $uomSmall]);
    }

    public function getAllData(Request $request){
        $query = UomSmall::paginate($request->itemPerPage, ['*'], 'page', $request->page);
        return $query;
    }

    public function getAllRawData(){
        $query = UomSmall::get();
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

        UomSmall::CreateOrUpdate($request);

        return redirect()->back();

    }

    public function destroy($id){
        $data = UomSmall::find($id);
        $data->delete();

        return response()->json([
            "data" => '',
            "message" => "Hapus berhasil"
        ], 202);
    }
}
