<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plan>
 */
class PlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => $this->faker->word,
            'harga' => $this->faker->randomElement(['50000', '99000', '199000']),
            'durasi' => $this->faker->randomElement(['30', '90', '365']),
            'deskripsi' => $this->faker->paragraphs(3, true),
            'fitur' => json_encode(['akses_video', 'tanpa_iklan', 'unduh_materi'])
        ];
    }
}
