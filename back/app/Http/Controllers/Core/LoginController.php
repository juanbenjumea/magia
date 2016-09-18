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

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // all good so return the token
        return response()->json(compact('token'));
    }
    
    public function index(Request $request){
        $credentials = $request->only('email', 'password');

        if ($this->auth->attempt($credentials)){
            echo "login";
        }

    }
}
