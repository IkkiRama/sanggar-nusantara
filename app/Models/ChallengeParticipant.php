<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChallengeParticipant extends Model
{
    /** @use HasFactory<\Database\Factories\ChallengeParticipantFactory> */
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function challenge(): BelongsTo
    {
        return $this->belongsTo(Challenge::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function progres(): HasMany
    {
        return $this->hasMany(ChallengeProgres::class);
    }

    // Accessor: cek apakah semua hari sudah diverifikasi
    public function getIsCompletedAttribute(): bool
    {
        $total = $this->progres()->count();
        $verified = $this->progres()->where('status', 'approved')->count();
        return $total > 0 && $total === $verified;
    }
}
