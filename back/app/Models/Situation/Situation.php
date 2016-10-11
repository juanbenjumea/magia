<?php

namespace Magia\Models\Situation;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Situation extends Model {

    use SoftDeletes;
    protected $table = 'st_situation';
    protected $fillable = ['result_id', 'name', 'detail'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function result() {
        return $this->belongsTo('\Magia\Models\Result\Result', 'result_id', 'id');
    }

    public function solution() {
        return $this->hasMany('\Magia\Models\Situation\Solution', 'situation_id', 'id');
    }

    public function methods() {
        return $this->belongsToMany('\Magia\Models\Core\Method', 'st_in_method', 'situation_id', 'method_id')->withPivot('original');
    }
    
    public function analysis(){
        return $this->hasMany('\Magia\Models\Peirce\Analysis');
    }
    
    public function steps() {
        return $this->belongsToMany('\Magia\Models\Steps\Steps', 'el_step_situation', 'situation_id', 'step_id');
    }
}
