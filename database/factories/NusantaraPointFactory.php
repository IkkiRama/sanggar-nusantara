<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Nusantara_point>
 */
class NusantaraPointFactory extends Factory
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
            'points' => $this->faker->numberBetween(0, 1000),
            'source' => 'Challenge: ' . $this->faker->word(),
            'amount' => $this->faker->numberBetween(10, 100),
        ];
    }
}
