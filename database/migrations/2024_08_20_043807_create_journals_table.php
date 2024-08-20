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
        Schema::create('journals', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('debit_account');
            $table->unsignedBigInteger('debit_amount');
            $table->unsignedInteger('credit_account');
            $table->unsignedBigInteger('credit_amount');
            $table->string('name');
            $table->string('description');
            $table->foreign('debit_account')->references('account_number')->on('journal_accounts');
            $table->foreign('credit_account')->references('account_number')->on('journal_accounts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journals');
    }
};
