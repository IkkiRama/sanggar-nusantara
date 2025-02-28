<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PembelianEvent>
 */
class PembelianEventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_id' => \App\Models\Event::factory(),
            'orders_id' => \App\Models\Order::factory(),
            'jumlah_tiket' => $this->faker->numberBetween(1, 10),
            'jenis_tiket' => $this->faker->word,
            'nama' => $this->faker->name,
            'harga' => $this->faker->randomFloat(2, 50000, 2000000),
            'tanggal' => $this->faker->date,
        ];
    }
}
