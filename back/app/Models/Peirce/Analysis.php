<?php

namespace Magia\Models\Peirce;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Analysis extends Model {

    use SoftDeletes;
    protected $table = 'pr_analysis';
    protected $fillable = ['situation_id'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function situation() {
        return $this->belongsTo('\Magia\Models\Situation\Situation', 'situation_id', 'id');
    }

    public function logics() {
        return $this->belongsToMany('\Magia\Models\Peirce\LogicType', 'pr_analysis_logic', 'analysis_id', 'logic_type_id');
    }

    public function hypothesis() {
        return $this->hasMany('\Magia\Models\Peirce\Hypothesis', 'analysis_id', 'id');
    }

    public function thesis() {
        return $this->hasMany('\Magia\Models\Peirce\Thesis', 'analysis_id', 'id');
    }
}
