<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'total_akhir', 'discount_id', 'discount_amount', 'total_pembelian', 'status_pembelian', 'order_id', 'metode_pembayaran', 'transaction_id', 'payment_url', 'midtrans_response'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pembelianEvent()
    {
        return $this->hasMany(PembelianEvent::class);
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }

    public function subscription()
    {
        return $this->hasOne(Subscription::class, 'transaction_id', 'order_id');
    }
}
