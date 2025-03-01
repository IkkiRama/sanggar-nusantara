<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Discount>
 */
class DiscountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'type' => $this->faker->randomElement(['percentage', 'fixed', 'voucher']),
            'amount' => $this->faker->randomFloat(2, 5, 50),
            'code' => $this->faker->bothify('DISC-####'),
            'min_purchase' => $this->faker->randomFloat(2, 50, 500),
            'max_discount' => $this->faker->randomFloat(2, 100, 500),
            'start_date' => now(),
            'end_date' => now()->addDays(30),
            'usage_limit' => $this->faker->numberBetween(10, 100),
            'usage_count' => 0,
        ];
    }
}
