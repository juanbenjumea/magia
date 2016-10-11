<?php

namespace Magia\Http\Controllers\Peirce;

use Illuminate\Http\Request;

use Magia\Http\Requests;
use Magia\Http\Controllers\Controller;
use Magia\Models\Peirce\Analysis;

class AnalysisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Analysis::with(['logics.quadrants'
                                , 'hypothesis.quadrant.logic_type'
                                , 'thesis.quadrant.logic_type'])
                        ->where('situation_id', $request->input('situation_id'))
                        ->orderBy('created_at', 'desc')
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
        $analysis = Analysis::create(array(
                        'situation_id' => $request->input('situation_id')
                    ));
        $logics = $analysis->logics()->attach($request->input('logics'));
        $analysis->logics = $logics;
        return $analysis;
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
        $analysis = Analysis::find($id);
        return $analysis->logics()->sync($request->input('logics'));
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
