<?php

namespace Magia\Models\Situation;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Solution extends Model {

    use SoftDeletes;
    protected $table = 'st_solution';
    protected $fillable = ['situation_id', 'method_id', 'detail'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
}
