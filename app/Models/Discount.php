<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Discount extends Model
{
    /** @use HasFactory<\Database\Factories\DiscountFactory> */
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'name', 'type', 'amount', 'code', 'min_purchase',
        'max_discount', 'start_date', 'end_date', 'usage_limit', 'usage_count'
    ];

    public function users()
    {
        return $this->hasMany(DiscountUser::class);
    }

    public function events()
    {
        return $this->hasMany(DiscountEvent::class);
    }
}
