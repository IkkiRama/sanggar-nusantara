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
        Schema::create('alat_musiks', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('asal');
            $table->string('image');
            $table->enum('cara_main', ['dipetik', 'ditiup', 'dipukul', 'digesek']);
            $table->string('audio');
            $table->string('video')->nullable();
            $table->text('excerpt')->nullable();
            $table->text('deskripsi')->nullable();
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
        Schema::dropIfExists('alat_musiks');
    }
};
