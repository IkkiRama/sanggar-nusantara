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
        Schema::create('nusantara_points', function (Blueprint $table) {
            $table->id();
            $table->string('_uuid'); // misal "Challenge: Pakai Batik"
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('amount')->default(0); // berapa poin yang ditambah
            $table->string('source')->nullable(); // misal "Challenge: Pakai Batik"
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nusantara_points');
    }
};
