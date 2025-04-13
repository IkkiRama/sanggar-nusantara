<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RumahAdat extends Model
{
    /** @use HasFactory<\Database\Factories\RumahAdatFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['nama', 'slug', 'user_id', 'asal', 'image', 'excerpt', 'deskripsi', 'lat', 'lng'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
