<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MakananKhas>
 */
class MakananKhasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'nama' => $this->faker->word,
            'slug' => $this->faker->slug,
            'asal' => $this->faker->city,
            'image' => $this->faker->imageUrl(),
            'bahan_utama' => $this->faker->words(3, true),
            'deskripsi' => $this->faker->text,
            'lat' => $this->faker->latitude,
            'lng' => $this->faker->longitude,
        ];
    }
}
