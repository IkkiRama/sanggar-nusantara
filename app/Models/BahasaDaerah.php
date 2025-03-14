<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BahasaDaerah extends Model
{
    use HasFactory;

    protected $table = 'bahasa_daerah';

    protected $fillable = [
        'nama',
        'daerah_asal',
        'jumlah_penutur',
        'kategori',
        'deskripsi',
        'image',
        'lat',
        'lng'
    ];
}
