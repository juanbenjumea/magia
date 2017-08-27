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
        $user_id = $request->input('user_id');
        $read = $request->input('read');
        if($user_id == 0){
            $user = JWTAuth::toUser($token);
            $user_id = $user->id;
        }

        $comments = array();

        $comment_result =  Comment::with(['element' => function($query) use ($user_id){
                                $query->where('user_id', $user_id);
                            }])
                        ->whereElementType('Magia\Models\Result\Result')
                        ->orderBy('created_at', 'desc')
                        ->get();

        foreach($comment_result as $c_res){
            if($c_res->element){
                $comments[$c_res->id] = $c_res;

                if($c_res->status === 0 && $read == 1){
                    $comment_update = Comment::find($c_res->id);
                    $comment_update->status = 1;
                    $comment_update->save();
                }
            }
        }

        $comment_phrase =  Comment::with(['element' => function($query) use ($user_id){
                                $query->whereHas('result', function($q1) use ($user_id){
                                    $q1->where('user_id', $user_id);
                                });
                            }])
                        ->whereElementType('Magia\Models\Result\ResultPhrase')
                        ->orderBy('created_at', 'desc')
                        ->get();

        foreach($comment_phrase as $c_phr){
            foreach($comment_phrase as $c_phr){
                if($c_phr->element){
                    $comments[$c_phr->id] = $c_phr;

                    if($c_phr->status === 0 && $read == 1){
                        $comment_update = Comment::find($c_phr->id);
                        $comment_update->status = 1;
                        $comment_update->save();
                    }
                }
            }
        }

        $comment_failed =  Comment::with(['element' => function($query) use ($user_id){
                                $query->whereHas('result_phrase.result', function($q1) use ($user_id){
                                    $q1->where('user_id', $user_id);
                                });
                            }])
                        ->whereElementType('Magia\Models\Result\Failed')
                        ->orderBy('created_at', 'desc')
                        ->get();

        foreach($comment_failed as $c_fail){
            if($c_fail->element){
                $comments[$c_fail->id] = $c_fail;

                if($c_fail->status === 0 && $read == 1){
                    $comment_update = Comment::find($c_fail->id);
                    $comment_update->status = 1;
                    $comment_update->save();
                }
            }
        }

        $date = array();
        foreach ($comments as $key => $row)
        {
            $date[$key] = $row['created_at'];
        }
        array_multisort($date, SORT_DESC, $comments);

        return $comments;
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
        
        switch($element_type){
            case 'rs':
                $type = 'Magia\Models\Result\Result';
                break;
            case 'ph':
                $type = 'Magia\Models\Result\ResultPhrase';
                break;
            case 'ch':
                $type = 'Magia\Models\Result\ResultPhrase';
                break;
            case 'dv':
                $type = 'Magia\Models\Result\ResultPhrase';
                break;
            case 'fl':
                $type = 'Magia\Models\Result\Failed';
                break;
        }
        
        $new_comment = Comment::create(array(
            'user_teacher_id' => 1, 
            'comment' => $comment,
            'element_id' => $element_id,
            'element_type' => $type,
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
        $comment = Comment::find($id);
        if($request->has('status')){
            $comment->status = $request->input('status');
        }

        $comment->save();
        return $comment;
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
