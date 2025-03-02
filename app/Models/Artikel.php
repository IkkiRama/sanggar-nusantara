<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Artikel extends Model
{
    /** @use HasFactory<\Database\Factories\ArtikelFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['title', 'slug', 'views', 'user_id', 'kategori_id', 'image', 'excerpt', 'keyword', 'content', 'status_artikel', 'published_at'];

    public function kategori()
    {
        return $this->belongsTo(KategoriArtikel::class, 'kategori_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function komentar(): HasMany
    {
        return $this->hasMany(Komentar::class, 'artikel_id');
    }
}
