<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HargaEvent>
 */
class HargaEventFactory extends Factory
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
            'nama' => $this->faker->word,
            'harga' => $this->faker->randomFloat(2, 10000, 1000000),
            'deskripsi' => $this->faker->paragraph,
            'tanggal_mulai' => $this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d H:i:s'),
            'tanggal_selesai' => $this->faker->dateTimeBetween('+1 month', '+2 months')->format('Y-m-d H:i:s'),
        ];
    }
}
