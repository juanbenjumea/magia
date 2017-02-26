<?php

namespace Magia\Http\Controllers\Teaching;

use Illuminate\Http\Request;

use Magia\Http\Requests;
use Magia\Http\Controllers\Controller;
use Magia\Models\Teaching\Comment;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class CommentController extends Controller
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
        $user_id = $user->id;
        $user_id = 1;
        
        
        // /////////////////////////////////////////////////////////////////////////
        // /////////////////////////////////////////////////////////////////////////
        // L L E V O   7 5   M I N  U T O S   T R A B A J A N D O   E N   E S T O //
        // /////////////////////////////////////////////////////////////////////////
        // /////////////////////////////////////////////////////////////////////////
        
        
        // TODO_MAGIA: Filtrar los resultados por usuario
        $comment_result =  Comment::whereHas('element', function($query) use ($user_id){
                                $query->where('element_type', 'Magia\Models\Result\Result')
                                        ->where('element.user_id', $user_id);
                            })
                        ->orderBy('created_at', 'desc')
                        ->get();
        /*
        $comment_result =  Comment::with(['element' => function($query) use ($user_id){
                                $query->where('user_id', $user_id);
                            }])
                        ->whereElementType('Magia\Models\Result\Result')
                        ->orderBy('created_at', 'desc')
                        ->get();

        $comment_phrase =  Comment::with(['element.result' => function($query) use ($user_id){
                                $query->where('user_id', $user_id);
                            }])
                        ->whereElementType('Magia\Models\Result\ResultPhrase')
                        ->orderBy('created_at', 'desc')
                        ->get();

        $comment_failed =  Comment::with(['element.result_phrase.result' => function($query) use ($user_id){
                                $query->where('user_id', $user_id);
                            }])
                        ->whereElementType('Magia\Models\Result\Failed')
                        ->orderBy('created_at', 'desc')
                        ->get();

        return [$comment_result, $comment_phrase, $comment_failed];
        */
        return [$comment_result];
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
        $comment = $request->input('comment');
        $element_id = $request->input('item_id');
        $element_type = $request->input('item_type');

        // TODOMAGIA: Asiganar el admin
        //$admin = User::where('username', 'elmauriga@gmail.com')->get();

        $new_comment = Comment::create(array(
            'user_teacher_id' => 1, 
            'comment' => $comment,
            'element_id' => $element_id,
            'element_type' => $element_type,
            'status' => 0
        ));
        return $new_comment;
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
                            , 'result_phrases.failed'  => function ($query) {
                                    $query->orderBy('created_at', 'desc'); 
                                }
                            , 'beyond_son'
                            , 'beyond_parent'
                            , 'merge_sons'
                            , 'merge_parent.merge_sons'
                            , 'sadhana_sons'
                            , 'sadhana_parent.sadhana_sons'
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
        if($request->has('name')){
            $name = $request->input('name');
            $duplicate = self::checkDuplicate($name, $id);
            if($duplicate->count() === 0){
                $result->name = $name;
            }
            else {
                return response()->json([
                    'message' => 'Nombre de resultado duplicado'
                ], 500);
            }
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
    
    
    public static function checkDuplicate($name, $id = null) {
        $result = Result::where('name', 'like', $name);
        if($id){
            $result->where('id', '!=', $id);
        }
        $result->get();
        return $result;
    }
}
