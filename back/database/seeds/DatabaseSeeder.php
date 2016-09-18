<?php

use Illuminate\Database\Seeder;
use Magia\Models\Core\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = array(
                ['name' => 'Juan Benjumea', 'email' => 'juan@benjumea.net', 'password' => Hash::make('111111')]
        );
        // $this->call(UsersTableSeeder::class);
        
        foreach ($users as $user)
        {
            User::create($user);
        }
    }
}
