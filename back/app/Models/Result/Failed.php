<?php

namespace Magia\Models\Result;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Failed extends Model {

    use SoftDeletes;
    protected $table = 'rs_failed';
    protected $fillable = ['result_phrase_id', 'say', 'said', 'uncover'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function result_phrase() {
        return $this->belongsTo('\Magia\Models\Result\ResultPhrase', 'result_phrase_id', 'id');
    }

    public function comments() {
        return $this->morphMany('\Magia\Models\Teaching\Comment', 'element');
    }
}
