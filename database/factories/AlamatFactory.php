<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Alamat>
 */
class AlamatFactory extends Factory
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
            'alamat' => $this->faker->address(),
            'kabupaten' => $this->faker->city(),
            'provinsi' => $this->faker->state(),
            'kecamatan' => $this->faker->city(),
            'desa' => $this->faker->city(),
            'kode_pos' => $this->faker->postcode(),
        ];
    }
}
