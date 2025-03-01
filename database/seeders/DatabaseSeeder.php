<?php

namespace Database\Seeders;

use App\Models\Alamat;
use App\Models\Discount;
use App\Models\DiscountEvent;
use App\Models\DiscountUser;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->count(10)->create();
        Alamat::factory()->count(10)->create();
        \App\Models\Cart::factory(10)->create();
        \App\Models\Order::factory(10)->create();
        \App\Models\KategoriArtikel::factory(5)->create();
        \App\Models\Artikel::factory(10)->create();
        \App\Models\KategoriEvent::factory(5)->create();
        \App\Models\Event::factory(10)->create();
        \App\Models\HargaEvent::factory(20)->create();
        \App\Models\PembelianEvent::factory(30)->create();
        \App\Models\Plan::factory(10)->create();
        \App\Models\Subscription::factory(10)->create();
        Discount::factory(10)->create();
        DiscountUser::factory(10)->create();
        DiscountEvent::factory(10)->create();
    }
}
