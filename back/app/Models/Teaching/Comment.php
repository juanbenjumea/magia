<?php

namespace Magia\Models\Teaching;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model {

    use SoftDeletes;
    protected $table = 'tc_comment';
    protected $fillable = ['user_teacher_id', 'element_type', 'element_id', 'comment', 'status'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function element() {
        return $this->morphTo();
    }
}
