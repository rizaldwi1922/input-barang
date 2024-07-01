<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\UomBig;
use Illuminate\Support\Facades\Validator;

class UomBigController extends Controller
{
    public function index(){
        return Inertia::render('MasterData/UomBig/index');
    }

    public function form(){
        return Inertia::render('MasterData/UomBig/form');
    }

    public function show($id){
        $uomBig = UomBig::find($id);
        return Inertia::render('MasterData/UomBig/form', ['UomBig' => $uomBig]);
    }

    public function getAllData(Request $request){
        $query = UomBig::paginate($request->itemPerPage, ['*'], 'page', $request->page);
        return $query;
    }

    public function getAllRawData(){
        $query = UomBig::get();
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

        UomBig::CreateOrUpdate($request);

        return redirect()->back();

    }

    public function destroy($id){
        $data = UomBig::find($id);
        $data->delete();

        return response()->json([
            "data" => '',
            "message" => "Hapus berhasil"
        ], 202);
    }
}
