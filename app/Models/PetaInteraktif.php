<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PetaInteraktif extends Model
{
    /** @use HasFactory<\Database\Factories\PetaInteraktifFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['judul', 'tipe', 'asal', 'image', 'lat', 'lng'];
}
