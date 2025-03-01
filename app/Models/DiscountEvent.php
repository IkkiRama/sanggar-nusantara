<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DiscountEvent extends Model
{
    /** @use HasFactory<\Database\Factories\DiscountEventFactory> */
    use HasFactory, SoftDeletes;
    protected $fillable = ['discount_id', 'event_id'];

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
