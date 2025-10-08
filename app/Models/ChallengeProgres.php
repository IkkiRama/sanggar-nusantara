<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChallengeProgres extends Model
{
    /** @use HasFactory<\Database\Factories\ChallengeProgresFactory> */
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];

    public function participant(): BelongsTo
    {
        return $this->belongsTo(ChallengeParticipant::class, "challenge_participant_id");
    }
}
