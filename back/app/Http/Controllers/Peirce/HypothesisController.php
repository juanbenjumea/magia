<?php

namespace Magia\Http\Controllers\Peirce;

use Illuminate\Http\Request;

use Magia\Http\Requests;
use Magia\Http\Controllers\Controller;
use Magia\Models\Peirce\Hypothesis;

class HypothesisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Hypothesis::with(['quadrant.logic_type'])
                        ->where('analysis_id', $request->input('analysis_id'))
                        ->get();
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
        $error = 1;
        Hypothesis::where('analysis_id', $request->input('analysis_id'))
                    ->delete();
        foreach($request->input('hypothesis') as $quadrant_id => $detail){
            if($detail) {
                Hypothesis::create(array(
                            'analysis_id' => $request->input('analysis_id'),
                            'quadrant_id' => $quadrant_id,
                            'detail' => $detail
                        ));
                $error = 0; 
            }
        }
        if($error == 1){
            return response()->json([
                'message' => 'No se ingresaron datos'
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
        //
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
}
