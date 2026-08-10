<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserProfileFieldsTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_fields_are_fillable(): void
    {
        $user = User::factory()->create([
            'first_name' => 'Telmo',
            'last_name' => 'Ramirez',
            'phone' => '555-1234',
            'country' => 'Spain',
            'city' => 'Madrid',
            'address' => 'Calle Falsa 123',
        ]);

        $this->assertSame('Telmo', $user->first_name);
        $this->assertSame('Ramirez', $user->last_name);
        $this->assertSame('555-1234', $user->phone);
        $this->assertSame('Spain', $user->country);
        $this->assertSame('Madrid', $user->city);
        $this->assertSame('Calle Falsa 123', $user->address);
    }
}
