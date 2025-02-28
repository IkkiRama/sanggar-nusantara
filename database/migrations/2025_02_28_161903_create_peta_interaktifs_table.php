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
        Schema::create('peta_interaktifs', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->enum('tipe', ['lagu', 'alat musik', 'rumah adat', 'makanan khas']);
            $table->string('asal');
            $table->string('image');
            $table->decimal('lat', 10, 7);
            $table->decimal('lng', 10, 7);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peta_interaktifs');
    }
};
