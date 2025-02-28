<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kontak extends Model
{
    /** @use HasFactory<\Database\Factories\KontakFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['email', 'nama', 'pesan'];
}
