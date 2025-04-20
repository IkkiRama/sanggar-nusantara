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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kategori_event_id')->constrained('kategori_events')->onDelete('cascade');
            $table->string('nama');
            $table->string('slug')->unique();
            $table->string('image')->nullable();
            $table->enum('status_event', ['draft', 'publish', 'premium']);
            $table->text('keyword');
            $table->text('excerpt');
            $table->longText('deskripsi');
            $table->string('tempat');
            $table->timestamps('tanggal');
            $table->text('link_gmap')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
