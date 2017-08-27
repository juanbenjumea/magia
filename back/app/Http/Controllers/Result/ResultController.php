<?php

namespace Magia\Http\Controllers\Result;

use Illuminate\Http\Request;

use Magia\Http\Requests;
use Magia\Http\Controllers\Controller;
use Magia\Models\Result\Result;
use Magia\Http\Controllers\Result\ResultPhraseController;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $token = $request->input('token');
        $user = JWTAuth::toUser($token);

        // TODO_MAGIA: Filtrar los resultados por usuario
        return Result::with([   'result_phrases' => function ($query) {
                                    $query->orderBy('created_at', 'desc'); 
                                }
                                , 'result_phrases.failed' => function ($query) {
                                    $query->orderBy('created_at', 'desc'); 
                                }
                                , 'beyond_son'
                                , 'beyond_parent'
                                , 'merge_sons'
                                , 'merge_parent'
                                , 'sadhana_sons'
                                , 'sadhana_parent'
                            ])
                        ->where('user_id', $user->id)
                        ->where(function ($query) {
                            $query->doesntHave('sadhana_parent')
                                ->doesntHave('merge_parent')
                                ->doesntHave('beyond_son');
                        })
                        ->orderBy('created_at', 'desc')
                        ->take(10)
                        ->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $name = $request->input('name');
        $token = $request->input('token');
        $user = JWTAuth::toUser($token);

        $duplicate = self::checkDuplicate($name, $user->id);

        if($duplicate->count() === 0){
            $new_result = Result::create(array(
                'user_id' => $user->id,
                'name' => $name
            ));

            if($request->input('chaos') != '' || $request->input('detail') != ''){
                $result_phrase = ResultPhraseController::store($request, $new_result->id);
                $result_phrase->failed = [];
                $new_result->otro_campo = 'si se almacena';
                $new_result->result_phrases = ['0' => $result_phrase];
            }

            return $new_result;
        }
        else {
            return response()->json([
                'message' => 'Nombre de resultado duplicado'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // TODO_MAGIA: Verificar que el resultados pretencezca al usuario
        return Result::with(['result_phrases' => function ($query) {
                                    $query->orderBy('created_at', 'desc'); 
                                }
                            , 'result_phrases.comments'
                            , 'result_phrases.failed'  => function ($query) {
                                    $query->orderBy('created_at', 'desc'); 
                                }
                            , 'result_phrases.failed.comments'
                            , 'beyond_son'
                            , 'beyond_parent'
                            , 'merge_sons'
                            , 'merge_parent.merge_sons'
                            , 'sadhana_sons'
                            , 'sadhana_parent.sadhana_sons'
                            , 'comments'
                            ])
                        ->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $result = Result::find($id);
        $token = $request->input('token');
        $user = JWTAuth::toUser($token);
        
        if($request->has('name')){
            $name = $request->input('name');
            $duplicate = self::checkDuplicate($name, $user->id. $id);
            if($duplicate->count() === 0){
                $result->name = $name;
            }
            else {
                return response()->json([
                    'message' => 'Nombre de resultado duplicado'
                ], 500);
            }
        }
        if($request->has('status_review')){
            $result->status_review = $request->input('status_review');
        }
        if($request->has('completed')){
            $result->completed = $request->input('completed');
        }
        if($request->has('integration')){
            $result = Result::find($request->input('son'));
            $type = $request->input('integration');
            switch($type){
                case 'beyond':
                    $result->result_beyond_id = $request->input('parent');
                    break;
                case 'sadhana':
                    $result->result_sadhana_id = $request->input('parent');
                    break;
                case 'merge':
                    $result->result_merge_id = $request->input('parent');
                    break;
            }
        }
        $result->save();
        return $result;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Result::find($id)->delete();
        return ['id' => $id];
    }
    
    
    public static function checkDuplicate($name, $user_id, $id = null) {
        
        $result = Result::where('name', 'like', $name)
                        ->where('user_id', $user_id);
        if($id){
            $result->where('id', '!=', $id);
        }
        $result->get();
        return $result;
    }
}
