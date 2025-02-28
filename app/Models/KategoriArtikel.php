<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class KategoriArtikel extends Model
{
    /** @use HasFactory<\Database\Factories\KategoriArtikelFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['slug', 'image', 'nama', 'deskripsi'];

    public function artikels()
    {
        return $this->hasMany(Artikel::class, 'kategori_id');
    }
}
