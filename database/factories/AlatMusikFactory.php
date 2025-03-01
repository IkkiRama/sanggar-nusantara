<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AlatMusik>
 */
class AlatMusikFactory extends Factory
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
            'asal' => $this->faker->city,
            'image' => $this->faker->imageUrl(),
            'cara_main' => $this->faker->randomElement(['dipetik', 'ditiup', 'dipukul', 'digesek']),
            'audio' => $this->faker->url,
            'video' => $this->faker->url,
            'excerpt' => $this->faker->sentence,
            'deskripsi' => $this->faker->text,
            'lat' => $this->faker->latitude,
            'lng' => $this->faker->longitude,
        ];
    }
}
