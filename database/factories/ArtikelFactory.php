<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artikel>
 */
class ArtikelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'slug' => $this->faker->slug,
            'views' => $this->faker->numberBetween(0, 1000),
            'user_id' => 1,
            'kategori_id' => 1,
            'image' => $this->faker->imageUrl,
            'excerpt' => $this->faker->text(100),
            'keyword' => $this->faker->words(5, true),
            'content' => $this->faker->paragraphs(3, true),
            'status_artikel' => $this->faker->randomElement(['draft', 'publish', 'premium']),
            'published_at' => now(),
        ];
    }
}
