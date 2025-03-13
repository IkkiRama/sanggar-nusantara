<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DiscountUser extends Model
{
    /** @use HasFactory<\Database\Factories\DiscountUserFactory> */
    use HasFactory, SoftDeletes;
    protected $fillable = ['discount_id', 'user_id'];

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
