<?php

namespace Magia\Models\Peirce;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LogicType extends Model {

    use SoftDeletes;
    protected $table = 'pr_logic_type';
    protected $fillable = ['name'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

}
