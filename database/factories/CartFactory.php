<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cart>
 */
class CartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'item_id' => $this->faker->randomNumber(),
            'item_type' => $this->faker->randomElement(['event', 'produk']),
            'jumlah' => $this->faker->numberBetween(1, 10),
            'harga' => $this->faker->randomFloat(2, 1000, 100000),
        ];
    }
}
