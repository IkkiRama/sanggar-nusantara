<?php

namespace Database\Factories;

use App\Models\Discount;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
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
            'discount_id' => Discount::factory(),
            'total_pembelian' => $this->faker->randomFloat(2, 1000, 100000),
            'discount_amount' => $this->faker->randomFloat(2, 0, 500),
            'total_akhir' => $this->faker->randomFloat(2, 1000, 100000),
            'status_pembelian' => 'pending',
            'order_id' => $this->faker->uuid,
            'metode_pembayaran' => 'midtrans',
            'transaction_id' => $this->faker->uuid,
            'payment_url' => $this->faker->url,
            'midtrans_response' => '{}',
        ];
    }
}
