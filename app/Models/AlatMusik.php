<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AlatMusik extends Model
{
    /** @use HasFactory<\Database\Factories\AlatMusikFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['nama', 'asal', 'image', 'cara_main', 'audio', 'video', 'excerpt', 'deskripsi'];
}
