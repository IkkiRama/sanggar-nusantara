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
        Schema::create('lagu_daerahs', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('pencipta')->nullable();
            $table->integer('tahun_diciptakan')->nullable();
            $table->string('asal');
            $table->string('image')->nullable();
            $table->string('audio');
            $table->string('video')->nullable();
            $table->enum('kategori', ['tradisional', 'modern']);
            $table->text('lirik')->nullable();
            $table->text('sejarah')->nullable();
            $table->string('lat');
            $table->string('lng');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lagu_daerahs');
    }
};
