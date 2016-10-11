<?php

namespace Magia\Models\Peirce;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LogicType extends Model {

    use SoftDeletes;
    protected $table = 'pr_logic_type';
    protected $fillable = ['logic_type', 'position', 'name', 'detail'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function quadrants(){
        return $this->hasMany('\Magia\Models\Peirce\Quadrant', 'logic_type_id', 'id');
    }
}
