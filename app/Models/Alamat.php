<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Alamat extends Model
{
    /** @use HasFactory<\Database\Factories\AlamatFactory> */
    use HasFactory, SoftDeletes;
    protected $fillable = ['user_id', 'alamat', 'kabupaten', 'provinsi', 'kecamatan', 'desa', 'kode_pos'];

    public function user() { return $this->belongsTo(User::class, 'user_id'); }
}
