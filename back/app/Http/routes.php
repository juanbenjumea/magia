<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Route::group(['prefix' => 'api', 'middleware' => 'cors'], function () {
Route::group(['prefix' => 'api'], function () {
    Route::resource('authenticate', 'Core\LoginController', ['only' => ['index']]);
    Route::post('authenticate', 'Core\LoginController@authenticate');
});

Route::resource('fwf', 'Core\FromWhereFailureController');
Route::resource('method', 'Core\FromWhereFailureController');
Route::resource('result', 'Result\ResultController');
Route::resource('result-phrase', 'Result\ResultPhraseController');
Route::resource('deviation', 'Result\DeviationController');
Route::resource('failed', 'Result\FailedController');
Route::resource('situation', 'Situation\SituationController');
Route::resource('solution', 'Situation\SolutionController');
Route::resource('analysis', 'Peirce\AnalysisController');
Route::resource('logic-type', 'Peirce\LogicTypeController');
Route::resource('hypothesis', 'Peirce\HypothesisController');
Route::resource('thesis', 'Peirce\ThesisController');
Route::resource('steps', 'Steps\StepsController');
Route::resource('user', 'Core\UserController');
Route::resource('comment', 'Teaching\CommentController');
Route::auth();

Route::get('/home', 'HomeController@index');
