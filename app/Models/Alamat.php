<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Alamat extends Model
{
    /** @use HasFactory<\Database\Factories\AlamatFactory> */
    use HasFactory, SoftDeletes;
    protected $fillable = ['id_user', 'alamat', 'kabupaten', 'provinsi', 'kode_pos'];
    public function user() { return $this->belongsTo(User::class, 'id_user'); }
}
