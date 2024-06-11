<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Barang;
use App\Models\NewBarang;
use App\Models\Kategori;
use App\Models\SatuanBesar;
use App\Models\SatuanKecil;

class BarangController extends Controller
{
    public function input(){
        $kategori = Kategori::all();
        $satuanBesar = SatuanBesar::all();
        $satuanKecil = SatuanKecil::all();

        return Inertia::render('Form/index', ['kategori' => $kategori, 'satuanBesar' => $satuanBesar, 'satuanKecil' => $satuanKecil]);
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
        $validated = $request->validate([
            'barcode' => 'required|unique:new_barangs,barcode',
            'nama' => 'required',
            'kategori' => 'required'
        ]);

        $barang = new NewBarang();
        $barang->barcode = $validated['barcode'];
        $barang->nama = $validated['nama'];
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
