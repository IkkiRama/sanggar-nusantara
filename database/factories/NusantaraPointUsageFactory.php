<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NusantaraPointUsage>
 */
class NusantaraPointUsageFactory extends Factory
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
            'order_id' => 1, // nanti bisa diganti dengan factory pembelian
            'points_used' => $this->faker->numberBetween(50, 300),
        ];
    }
}
