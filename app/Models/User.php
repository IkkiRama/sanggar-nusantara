<?php

namespace App\Models;

use Filament\Panel;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, SoftDeletes, HasApiTokens;

    public function canAccessPanel(Panel $panel): bool
    {
        return true;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = ['name', 'email', 'password', 'image', 'email_verified_at', 'deskripsi', 'remember_token'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function alamat() { return $this->hasOne(Alamat::class, 'id_user'); }

    public function artikel()
    {
        return $this->hasMany(Artikel::class, 'artikel_id');
    }

    public function cart()
    {
        return $this->hasMany(Cart::class);
    }

    public function order()
    {
        return $this->hasMany(Order::class);
    }

    public function subscription()
    {
        return $this->hasMany(Subscription::class);
    }

    public function rumah_adat()
    {
        return $this->hasMany(RumahAdat::class);
    }

    public function makanan_khas()
    {
        return $this->hasMany(MakananKhas::class);
    }

    public function discounts()
    {
        return $this->hasMany(DiscountUser::class);
    }
    
    public function komentar(): HasMany
    {
        return $this->hasMany(Komentar::class, 'artikel_id');
    }
}
