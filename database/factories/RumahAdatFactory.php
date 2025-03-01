<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RumahAdat>
 */
class RumahAdatFactory extends Factory
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
            'asal_rumah' => $this->faker->city,
            'image' => $this->faker->imageUrl(),
            'excerpt' => $this->faker->sentence,
            'deskripsi' => $this->faker->text,
            'lat' => $this->faker->latitude,
            'lng' => $this->faker->longitude,
        ];
    }
}
