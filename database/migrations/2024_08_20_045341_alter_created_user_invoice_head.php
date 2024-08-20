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
        Schema::table('invoice_heads', function (Blueprint $table) {
            $table->unsignedBigInteger('created_user_id');
        });

        Schema::table('invoice_lines', function (Blueprint $table) {
            $table->unsignedBigInteger('created_user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoice_heads', function (Blueprint $table) {
            $table->dropColumn('created_user_id');
        });

        Schema::table('invoice_lines', function (Blueprint $table) {
            $table->dropColumn('created_user_id');
        });
    }
};
