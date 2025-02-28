<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PembelianEvent extends Model
{
    /** @use HasFactory<\Database\Factories\PembelianEventFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['event_id', 'orders_id', 'jumlah_tiket', 'jenis_tiket', 'nama', 'harga', 'tanggal'];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
