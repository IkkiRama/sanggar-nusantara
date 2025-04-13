<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BahasaDaerah extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'bahasa_daerah';

    protected $fillable = [
        'nama',
        'asal',
        'jumlah_penutur',
        'kategori',
        'deskripsi',
        'image',
        'lat',
        'lng'
    ];
}
