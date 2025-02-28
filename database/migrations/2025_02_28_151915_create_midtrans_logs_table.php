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
        Schema::create('midtrans_logs', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id');
            $table->string('order_id');
            $table->string('status_code', 10);
            $table->decimal('gross_amount', 15, 2);
            $table->string('payment_type', 50);
            $table->enum('transaction_status', ['pending', 'settlement', 'deny', 'expire', 'cancel', 'refund', 'partial_refund', 'chargeback']);
            $table->enum('fraud_status', ['accept', 'deny', 'challenge'])->default('accept');
            $table->text('midtrans_response');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('midtrans_logs');
    }
};
