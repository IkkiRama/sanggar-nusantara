<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kategori_event_id' => \App\Models\KategoriEvent::factory(),
            'nama' => $this->faker->sentence,
            'slug' => $this->faker->slug,
            'image' => $this->faker->imageUrl,
            'status_event' => $this->faker->randomElement(['draft', 'publish', 'premium']),
            'keyword' => $this->faker->words(5, true),
            'excerpt' => $this->faker->text(100),
            'deskripsi' => $this->faker->paragraphs(3, true),
            'tempat' => $this->faker->address,
            'link_gmap' => $this->faker->url,
        ];
    }
}
