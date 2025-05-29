<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cart extends Model
{
    /** @use HasFactory<\Database\Factories\CartFactory> */
    use HasFactory;
    protected $fillable = ['user_id', 'item_id', 'item_type', 'jumlah', "variasi", "harga", "subtotal"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
