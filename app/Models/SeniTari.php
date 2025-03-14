<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeniTari extends Model
{
    use HasFactory;

    // protected $table = 'seni_taris';

    protected $fillable = [
        'nama',
        'daerah_asal',
        'kategori',
        'tahun_diciptakan',
        'deskripsi',
        'lat',
        'lng'
    ];
}
