<?php

namespace Database\Factories;

use App\Models\Academic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Academic>
 */
class AcademicFactory extends Factory
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
            'title' => fake()->jobTitle(),
            'institution' => fake()->company(),
            'start_date' => fake()->dateTimeBetween('-10 years', '-5 years')->format('Y-m-d'),
            'end_date' => fake()->dateTimeBetween('-5 years', '-1 year')->format('Y-m-d'),
        ];
    }
}
