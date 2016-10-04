<?php

namespace Magia\Http\Controllers\Situation;

use Illuminate\Http\Request;

use Magia\Http\Requests;
use Magia\Http\Controllers\Controller;
use Magia\Models\Situation\Situation;

class SituationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Situation::with(['solution', 'methods'])
                        ->where('result_id', $request->input('result_id'))
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

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = array();
        $data['result_id'] = $request->input('result_id');
        $data['name'] = $request->input('name');

        $duplicate = self::checkDuplicate($data['name'], $data['result_id']);
        
        if($request->has('detail')){
            $data['detail'] = $request->input('detail');
        }
        if($duplicate->count() === 0){
            $situation = Situation::create($data);
            $methods = $situation->methods()->attach($request->input('method_id'), ['original' => 1]);
            $situation->methods = $methods;
        }
        else {
            return response()->json([
                    'message' => 'Nombre de sitaución duplicado'
                ], 500);
        }

        return $situation;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // TODO_MAGIA: Verificar que la sitaución pretencezca al usuario
        return Situation::with(['analysis' => function ($query) {
                                    $query->orderBy('created_at', 'desc'); 
                                }
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
    
    public static function checkDuplicate($name, $result_id = null) {
        $situation = Situation::where('name', 'like', $name);
        if($result_id){
            $situation->where('result_id', '=', $result_id);
        }
        $situation->get();
        return $situation;
    }
}
