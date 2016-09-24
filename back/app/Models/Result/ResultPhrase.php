<?php

namespace Magia\Models\Result;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ResultPhrase extends Model {

    use SoftDeletes;
    protected $table = 'rs_result_phrase';
    protected $fillable = ['result_id', 'detail', 'chaos'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function result() {
        return $this->belongsTo('\Magia\Models\Result\Result', 'result_id', 'id');
    }

    public function deviation_origin() {
        return $this->hasOne('\Magia\Models\Result\Deviation', 'result_phrase_origin_id', 'id');
    }

    public function deviation_final() {
        return $this->hasOne('\Magia\Models\Result\Deviation', 'result_phrase_final_id', 'id');
    }

    public function failed() {
        return $this->hasMany('\Magia\Models\Result\Failed', 'result_phrase_id', 'id');
    }
}