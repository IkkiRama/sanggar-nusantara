<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LaguDaerah>
 */
class LaguDaerahFactory extends Factory
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
            'pencipta' => $this->faker->name,
            'tahun_diciptakan' => $this->faker->year,
            'asal_lagu' => $this->faker->city,
            'image' => $this->faker->imageUrl(),
            'audio' => $this->faker->url,
            'video' => $this->faker->url,
            'kategori' => $this->faker->randomElement(['tradisional', 'modern']),
            'lirik' => $this->faker->paragraph,
            'sejarah' => $this->faker->text,
        ];
    }
}
