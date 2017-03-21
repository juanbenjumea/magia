<?php

namespace Magia\Http\Controllers\Core;

use Illuminate\Http\Request;

use Hash;
use Magia\Http\Requests;
use Magia\Http\Controllers\Controller;
use Magia\Models\Core\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $token = $request->input('token');
        $user = JWTAuth::toUser($token);

        if($user->email === 'elmauriga@gmail.com'){
            return User::with(['results.result_phrases.failed'])
                        ->orderBy('name', 'asc')
                        ->orderBy('last_name', 'asc')
                        ->get();
        }
        else {
            return;
        }
    }
    
    public function show($id)
    {
        return User::with(['results' => function ($query) {
                                    $query->orderBy('created_at', 'desc'); 
                                }
                            , 'results.comments'
                            , 'results.result_phrases' => function ($query) {
                                    $query->orderBy('created_at', 'desc'); 
                                }
                            , 'results.result_phrases.comments'
                            , 'results.result_phrases.failed'  => function ($query) {
                                    $query->orderBy('created_at', 'desc'); 
                                }
                            , 'results.result_phrases.failed.comments'
                            , 'results.beyond_son'
                            , 'results.beyond_parent'
                            , 'results.merge_sons'
                            , 'results.merge_parent.merge_sons'
                            , 'results.sadhana_sons'
                            , 'results.sadhana_parent.sadhana_sons'
                            ])
                        ->find($id);
    }
}
