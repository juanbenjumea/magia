<?php

namespace Magia\Models\Result;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Result extends Model {

    use SoftDeletes;
    protected $table = 'rs_result';
    protected $fillable = ['user_id', 'result_beyond_id', 'result_sadhana_id', 
                            'result_merge_id', 'name', 'completed'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function result_phrases() {
        return $this->hasMany('\Magia\Models\Result\ResultPhrase', 'result_id', 'id');
    }

    public function beyond_son() {
        return $this->hasOne('\Magia\Models\Result\Result', 'result_beyond_id', 'id');
    }

    public function beyond_parent() {
        return $this->belongsTo('\Magia\Models\Result\Result', 'result_beyond_id', 'id');
    }

    public function merge_sons() {
        return $this->hasMany('\Magia\Models\Result\Result', 'result_merge_id', 'id');
    }

    public function merge_parent() {
        return $this->belongsTo('\Magia\Models\Result\Result', 'result_merge_id', 'id');
    }

    public function sadhana_sons() {
        return $this->hasMany('\Magia\Models\Result\Result', 'result_sadhana_id', 'id');
    }

    public function sadhana_parent() {
        return $this->belongsTo('\Magia\Models\Result\Result', 'result_sadhana_id', 'id');
    }
}
