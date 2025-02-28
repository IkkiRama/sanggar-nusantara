<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RumahAdat extends Model
{
    /** @use HasFactory<\Database\Factories\RumahAdatFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['nama', 'user_id', 'asal_rumah', 'image', 'excerpt', 'deskripsi'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
