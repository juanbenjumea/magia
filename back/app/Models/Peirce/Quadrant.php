<?php

namespace Magia\Models\Peirce;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quadrant extends Model {

    use SoftDeletes;
    protected $table = 'pr_quadrant';
    protected $fillable = ['logic_type', 'position', 'name', 'detail'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function logic_type() {
        return $this->belongsTo('\Magia\Models\Peirce\LogicType', 'logic_type_id', 'id');
    }
}
