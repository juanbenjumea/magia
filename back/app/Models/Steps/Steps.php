<?php

namespace Magia\Models\Steps;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Steps extends Model {

    use SoftDeletes;
    protected $table = 'el_step';
    protected $fillable = ['name'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function situations() {
        return $this->belongsToMany('\Magia\Models\Situation\Situation', 'el_step_situation', 'step_id', 'situation_id');
    }
}
