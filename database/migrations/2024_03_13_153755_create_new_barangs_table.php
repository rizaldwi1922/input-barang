<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('new_barangs', function (Blueprint $table) {
            $table->id();
            $table->string('barcode')->unique();
            $table->string('nama');
            $table->enum('kategori', [
                'ALAT LISTRIK',
                'MINUMAN',
                'SUSU',
                'TEH & KOPI',
                'ROKOK',
                'TEPUNG',
                'SABUN & SAMPHOO',
                'PARFUM',
                'BISKUIT',
                'MANISAN',
                'BUMBU',
                'ELEKTRONIK',
                'MAKANAN KALENG',
                'SYRUP',
                'DETERGEN',
                'KOSMETIK',
                'SNACK',
                'COKELAT',
                'ALAT RUMAH TANGGA',
                'OBATAN',
                'MAKANAN',
                'PERMEN',
                'MENTEGA',
                'BEER',
                'MIE',
                'TISSUE',
                'TANDAS',
                'MINYAK GORENG',
                'STATIONERY',
                'KECAP & SAUCE',
                'PECAH BELAH',
                'PRODUCT BAYI',
                'MINYAK RAMBUT',
                'PAMPERS',
                'PASTA & S-GIGI',
                'LAIN-LAIN',
                'PEMBALUT WANITA',
                'MAKANAN BAYI',
                'GULAPUTIH',
                'KAPAS',
                'BERAS',
                'SEMIR SEPATU',
                'KACANG TANAH',
                'SLAI/JAM',
                'MAKANAN PAGI',
                'ES',
                'PAKAIAN',
                'KONSINYASI',
                'JAS HUJAN',
                'PEMBERSIH',
                'DIET FOOD',
                'ALAT BANGUNAN',
                'MAKANAN HEWAN'
            ]);
            $table->decimal('isi_kecil');
            $table->string('satuan_kecil');
            $table->decimal('isi_besar')->nullable();
            $table->string('satuan_besar')->nullable();
            $table->unsignedDecimal('harga_beli')->nullable();
            $table->unsignedDecimal('harga_jual')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('new_barangs');
    }
};
