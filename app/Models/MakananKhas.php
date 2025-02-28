<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MakananKhas extends Model
{
    /** @use HasFactory<\Database\Factories\MakananKhasFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['nama', 'user_id', 'asal_makanan', 'image', 'bahan_utama', 'deskripsi'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
