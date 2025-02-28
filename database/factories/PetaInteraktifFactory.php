<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PetaInteraktif>
 */
class PetaInteraktifFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul' => $this->faker->sentence(3),
            'tipe' => $this->faker->randomElement(['lagu', 'alat musik', 'rumah adat', 'makanan khas']),
            'asal' => $this->faker->city,
            'image' => $this->faker->imageUrl(),
            'lat' => $this->faker->latitude,
            'lng' => $this->faker->longitude,
        ];
    }
}
