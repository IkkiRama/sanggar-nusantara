<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SeniTari extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'seni_tari';

    protected $fillable = [
        'nama',
        "pencipta",
        "tahun_diciptakan",
        "asal",
        "image",
        "video",
        "kategori",
        "deskripsi",
        "sejarah",
        "lat",
        "lng"
    ];
}
