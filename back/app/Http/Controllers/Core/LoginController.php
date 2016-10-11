<?php

namespace Magia\Http\Controllers\Core;

use Illuminate\Http\Request;

use Hash;
use Magia\Http\Requests;
use Magia\Http\Controllers\Controller;
use Magia\Models\Core\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        // attempt to verify the credentials and create a token for the user
        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
        
        $user = JWTAuth::toUser($token);
        
        $user_data = [
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'created_at' => $user['created_at'],
            'updated_at' => $user['updated_at']
        ];
        
        $data = array_merge($user_data, ['token' => $token]);

        return response()->json($data);
    }
    
    public function index(Request $request){
        $credentials = $request->only('email', 'password');

        if ($this->auth->attempt($credentials)){
            echo "login";
        }

    }
}
