<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HargaEvent extends Model
{
    /** @use HasFactory<\Database\Factories\HargaEventFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['event_id', 'nama', 'harga'];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
