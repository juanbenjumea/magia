<?php

namespace Magia\Http\Controllers\Result;

use Illuminate\Http\Request;

use Magia\Http\Requests;
use Magia\Http\Controllers\Controller;
use Magia\Models\Result\Failed;

class FailedController extends Controller
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
        $result_phrase_id = $request->input('result_phrase_id');
        $say = $request->input('say');
        $said = $request->input('said');
        $uncover = $request->input('uncover');
        $failed = Failed::create(array(
            'result_phrase_id' => $result_phrase_id,
            'say' => $say,
            'said' => $said,
            'uncover' => $uncover
        ));

        return $failed;
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
        $failed = Failed::find($id);
        if($request->has('status_review')){
            $failed->status_review = $request->input('status_review');
        }
        else {
            $failed->status_review = 0;
        }
        $failed->save();
        return $failed;
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
