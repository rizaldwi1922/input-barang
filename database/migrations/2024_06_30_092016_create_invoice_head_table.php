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
        Schema::create('invoice_heads', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_num')->unique();
            $table->string('supplier')->nullable();
            $table->dateTime('invoice_date');
            $table->boolean('posted')->default(false);
            $table->string('posted_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_heads');
    }
};
