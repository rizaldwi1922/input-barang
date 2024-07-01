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
        Schema::create('invoice_lines', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invoice_id');
            $table->string('invoice_num');
            $table->unsignedBigInteger('item_id');
            $table->string('item_barcode');
            $table->enum('uom_type', ['BIG', 'SMALL']);
            $table->integer('qty');
            $table->unsignedBigInteger('price');
            $table->date('input_date');
            $table->date('expired_date');
            $table->foreign('invoice_id')->references('id')->on('invoice_heads');
            $table->foreign('invoice_num')->references('invoice_num')->on('invoice_heads');
            $table->foreign('item_id')->references('id')->on('items');
            $table->foreign('item_barcode')->references('barcode')->on('items');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_lines');
    }
};
