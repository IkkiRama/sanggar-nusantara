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
        Schema::create('seni_tari', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('pencipta')->nullable();
            $table->integer('tahun_diciptakan')->nullable();
            $table->string('asal');
            $table->string('image')->nullable();
            $table->string('video')->nullable();
            $table->enum('kategori', ['tradisional', 'modern'])->default('tradisional');
            $table->text('deskripsi')->nullable();
            $table->text('sejarah')->nullable();
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
        Schema::dropIfExists('seni_tari');
    }
};
