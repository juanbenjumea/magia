<?php

namespace Magia\Http\Controllers\Result;

use Illuminate\Http\Request;

use Magia\Http\Requests;
use Magia\Http\Controllers\Controller;
use Magia\Models\Result\Result;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Result::with([   'result_phrases' => function ($query) {
                                    $query->orderBy('created_at', 'desc'); 
                                },
                                'result_phrases.failed' => function ($query) {
                                    $query->orderBy('created_at', 'desc'); 
                                },
                                'result_phrases.deviation_origin',
                                'result_phrases.deviation_final'
                            ])
                        ->where('user_id', 1)
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
        
        $duplicate = self::checkDuplicate($name);
        
        if($duplicate->count() === 0){
            return Result::create(array(
                'user_id' => 1,
                'name' => $name
            ));
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
        //
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
            $result->name = $request->input('name');
        }
        if($request->has('completed')){
            $result->completed = $request->input('completed');
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
        //
    }
    
    
    public static function checkDuplicate($name, $result_id = null) {
        $result = Result::where('name', 'like', $name);
        if($result_id){
            $result->where('id', '=', $result_id);
        }
        $result->get();
        return $result;
    }
}
