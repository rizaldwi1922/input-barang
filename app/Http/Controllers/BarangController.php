<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Barang;
use App\Models\NewBarang;

class BarangController extends Controller
{
    public function input(){
        return Inertia::render('Form/index');
    }

    public function listData(){
        return Inertia::render('ListData/index');
    }

    public function getAllData(Request $request){
        $query = NewBarang::paginate($request->itemPerPage, ['*'], 'page', $request->page);
        return $query;
    }

    public function getData(Request $request){
        $barang = Barang::where('kode_barcode', $request->barcode)->first();
        return $barang;
    }

    public function store(Request $request){
        $barang = new NewBarang();
        $barang->barcode = $request->barcode;
        $barang->nama = $request->nama;
        $barang->kategori = $request->kategori;
        $barang->isi_kecil = $request->isi_satuan_kecil;
        $barang->satuan_kecil = $request->satuan_kecil;
        $barang->isi_besar = $request->isi_satuan_besar;
        $barang->satuan_besar = $request->satuan_besar;
        $barang->harga_beli = $request->harga_beli;
        $barang->harga_jual = $request->harga_jual;
        $barang->save();

        return redirect()->back();
    }
}
