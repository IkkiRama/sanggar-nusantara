<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class KategoriEvent extends Model
{
    /** @use HasFactory<\Database\Factories\KategoriEventFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['nama', 'slug'];

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
