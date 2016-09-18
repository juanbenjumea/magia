<?php

namespace Magia\Models\Result;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Result extends Authenticatable
{
    protected $table = 'rs_result';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
