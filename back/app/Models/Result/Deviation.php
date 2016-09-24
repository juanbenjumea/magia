<?php

namespace Magia\Models\Result;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Deviation extends Model {

    use SoftDeletes;
    protected $table = 'rs_deviation';
    protected $fillable = ['result_phrase_origin_id', 'result_phrase_final_id', 'detail'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function result_phrase_origin() {
        return $this->belongsTo('\Magia\Result\ResultPhrase', 'result_phrase_origin_id', 'id');
    }

    public function result_phrase_final() {
        return $this->belongsTo('\Magia\Result\ResultPhrase', 'result_phrase_final_id', 'id');
    }
}
