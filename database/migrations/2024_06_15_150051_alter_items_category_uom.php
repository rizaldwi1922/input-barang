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
        Schema::table('items', function (Blueprint $table) {
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('uom_small_id');
            $table->unsignedBigInteger('uom_big_id');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('uom_small_id')->references('id')->on('uom_smalls');
            $table->foreign('uom_big_id')->references('id')->on('uom_bigs');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropForeign('items_category_id_foreign');
            $table->dropForeign('items_uom_small_id_foreign');
            $table->dropForeign('items_uom_big_id_foreign');

            $table->dropColumn(['category_id', 'uom_small_id', 'uom_big_id']);

        });
    }
};
