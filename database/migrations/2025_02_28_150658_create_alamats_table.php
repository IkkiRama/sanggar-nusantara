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
        Schema::create('alamats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->text('alamat')->nullable();
            $table->string('provinsi', 50)->nullable();
            $table->string('kabupaten', 100)->nullable();
            $table->string('kecamatan', 100)->nullable();
            $table->string('desa', 100)->nullable();
            $table->string('kode_pos', 5)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alamats');
    }
};
