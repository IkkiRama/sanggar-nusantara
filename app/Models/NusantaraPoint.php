<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class NusantaraPoint extends Model
{
    /** @use HasFactory<\Database\Factories\NusantaraPointFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'amount', 'source'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Kalau poin berasal dari challenge, relasi opsional ini bisa dipakai:
    public function challenge(): BelongsTo
    {
        return $this->belongsTo(Challenge::class);
    }
}
