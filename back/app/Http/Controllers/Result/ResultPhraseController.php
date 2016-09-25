<?php

namespace Magia\Http\Controllers\Result;

use Illuminate\Http\Request;

use Magia\Http\Requests;
use Magia\Http\Controllers\Controller;
use Magia\Models\Result\ResultPhrase;
use Magia\Models\Result\Deviation;

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
    public function store(Request $request)
    {
        // TODO_MAGIA: Verificar si el resutl pertenece al usuario logeado
        // TODO_MAGIA: Verificar si hay un desvío asociado a la anterior frase resultado y asociarle esta nueva
        
        $result_id = $request->input('result_id');
        $detail = $request->input('detail');
        $duplicate = self::checkDuplicate($detail, $result_id);
        
        if($duplicate->count() === 0){
            $chaos = $request->input('chaos');
            $result_phrase = ResultPhrase::create(array(
                'result_id' => $result_id,
                'detail' => $detail,
                'chaos' => $chaos
            ));

            self::attachDeviationFinal($result_id, $result_phrase->id);

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
        $result_phrase->detail = $request->input('detail');
        $result_phrase->chaos = $request->input('chaos');
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
    
    public static function attachDeviationFinal($result_id, $result_phrase_id){
        
        // asociar como result_phrase_final_id al rs_deviation 
        // donde la result_phrase_id anterior sea el result_phrase_origin_id
        
        // Buscar la frase anterior
        // Buscar el desvío
        // Actualizar
        
        $previous = ResultPhrase::with('deviation_origin')
                    ->where('result_id', '=', $result_id)
                    ->where('id', '<', $result_phrase_id)
                    ->orderBy('created_at', 'desc')
                    ->first();

        if($previous->deviation_origin){
            $deviation_id = $previous->deviation_origin->id;

            $deviation = Deviation::find($deviation_id);
            $deviation->result_phrase_final_id = $result_phrase_id;
            $deviation->save();
        }
        
    }
}
