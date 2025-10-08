<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Challenge extends Model
{
    /** @use HasFactory<\Database\Factories\ChallengeFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['title', 'slug', 'description', 'image', 'nusantara_points'];

    public function participants(): HasMany
    {
        return $this->hasMany(ChallengeParticipant::class);
    }

    // (Opsional) relasi ke poin yang dihasilkan dari challenge ini
    public function points(): HasMany
    {
        return $this->hasMany(NusantaraPoint::class);
    }

    protected static function booted()
    {
        static::creating(function ($challenge) {
            if (empty($challenge->slug)) {
                $challenge->slug = Str::slug($challenge->title);
            }
        });

        static::updating(function ($challenge) {
            if ($challenge->isDirty('title')) {
                $challenge->slug = Str::slug($challenge->title);
            }
        });
    }
}
