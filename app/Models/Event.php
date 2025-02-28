<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['kategori_event_id', 'nama', 'slug', 'image', 'status_artikel', 'keyword', 'excerpt', 'deskripsi', 'tempat', 'tanggal', 'link_gmap'];

    public function kategori()
    {
        return $this->belongsTo(KategoriEvent::class, 'kategori_event_id');
    }

    public function harga()
    {
        return $this->hasMany(HargaEvent::class);
    }
}
