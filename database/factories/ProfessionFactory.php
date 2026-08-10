<?php

namespace Database\Factories;

use App\Models\Profession;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Profession>
 */
class ProfessionFactory extends Factory
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
            'company' => fake()->company(),
            'title' => fake()->jobTitle(),
            'detail' => fake()->paragraph(),
            'start_date' => fake()->dateTimeBetween('-10 years', '-5 years')->format('Y-m-d'),
            'end_date' => fake()->dateTimeBetween('-5 years', '-1 year')->format('Y-m-d'),
        ];
    }
}
