<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MidtransLog extends Model
{
    /** @use HasFactory<\Database\Factories\MidtransLogFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['transaction_id', 'order_id', 'status_code', 'gross_amount', 'payment_type', 'transaction_status', 'fraud_status', 'midtrans_response'];
}
