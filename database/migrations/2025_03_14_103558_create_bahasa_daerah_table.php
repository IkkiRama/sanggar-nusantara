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
        Schema::create('bahasa_daerah', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('asal');
            $table->integer('jumlah_penutur');
            $table->enum('kategori', ['tradisional', 'modern']);
            $table->text('deskripsi')->nullable();
            $table->string('image')->nullable();
            $table->string('lat', 50);
            $table->string('lng', 50);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bahasa_daerah');
    }
};
