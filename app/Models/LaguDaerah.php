<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LaguDaerah extends Model
{
    /** @use HasFactory<\Database\Factories\LaguDaerahFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['nama', 'pencipta', 'tahun_diciptakan', 'asal', 'image', 'audio', 'video', 'kategori', 'lirik', 'sejarah', 'lat', 'lng'];
}
