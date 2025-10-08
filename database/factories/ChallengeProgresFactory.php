<?php

namespace Database\Factories;

use App\Models\ChallengeParticipant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ChallengeProgres>
 */
class ChallengeProgresFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'challenge_participant_id' => ChallengeParticipant::factory(),
            'day_number' => $this->faker->numberBetween(1, 7),
            'image_bukti' => $this->faker->imageUrl(640, 480, 'proof', true),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'admin_note' => $this->faker->paragraph(),
            'verified_by' => User::factory(),
            'verified_at' => now(),
        ];
    }
}
