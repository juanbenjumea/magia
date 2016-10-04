<?php

namespace Magia\Http\Controllers\Result;

use Illuminate\Http\Request;

use Magia\Http\Requests;
use Magia\Http\Controllers\Controller;
use Magia\Models\Result\ResultPhrase;

class ResultPhraseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public static function store(Request $request, $result_id = null)
    {
        // TODO_MAGIA: Verificar si el resutl pertenece al usuario logeado
        // TODO_MAGIA: Verificar si hay un desvío asociado a la anterior frase resultado y asociarle esta nueva

        $data = array();
        
        if($result_id === null){
            $result_id = $request->input('result_id');
        }
        $data['result_id'] = $result_id;
        
        $no_detail = 1;
        if($request->has('detail')){
            $data['detail'] = $request->input('detail');
            $duplicate = self::checkDuplicate($data['detail'], $result_id);
            $no_detail = 0;
        }

        if($no_detail === 1 || $duplicate->count() === 0){
            if($request->has('chaos')){
                $data['chaos'] = $request->input('chaos');
            }
            $result_phrase = ResultPhrase::create($data);
            return $result_phrase;
        }
        else {
            return response()->json([
                    'message' => 'Frase resultado duplicada'
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
        $result_phrase = ResultPhrase::find($id);
        if($request->has('detail')){
            $result_phrase->detail = $request->input('detail');
        }
        if($request->has('chaos')){
            $result_phrase->chaos = $request->input('chaos');
        }
        if($request->has('deviation')){
            $result_phrase->deviation = $request->input('deviation');
        }
        $result_phrase->save();
        return $result_phrase;
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

    public static function checkDuplicate($detail, $result_id = null) {
        $result = ResultPhrase::where('detail', 'like', $detail);
        if($result_id){
            $result->where('result_id', '=', $result_id);
        }
        $result->get();
        return $result;
    }
}
