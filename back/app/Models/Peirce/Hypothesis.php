<?php

namespace Magia\Models\Peirce;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Hypothesis extends Model {

    use SoftDeletes;
    protected $table = 'pr_hypothesis';
    protected $fillable = ['analysis_id', 'quadrant_id', 'detail'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function quadrant() {
        return $this->belongsTo('\Magia\Models\Peirce\Quadrant', 'quadrant_id', 'id');
    }

    public function analysis() {
        return $this->belongsTo('\Magia\Models\Peirce\Analysis', 'analysis_id', 'id');
    }

}
