<?php

namespace Magia\Models\Core;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FromWhereFailure extends Model {

    use SoftDeletes;
    protected $table = 'co_from_where_failure';
    protected $fillable = ['user_id', 'name', 'core', 'detail'];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

}
