<?php

namespace Magia;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Failed extends Model {

    use SoftDeletes;
    protected $table = 'rs_failed';
    protected $fillable = ['result_phrase_id', 'detail'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function result_phrase() {
        return $this->belongsTo('\Magia\Result\ResultPhrase', 'result_phrase_id', 'id');
    }
}
