<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', 'Classroom\ClassroomController@overview')->name('root');


Route::prefix('classroom')->namespace('Classroom')->group(function (){
    Route::get('/', 'ClassroomController@overview') -> name('classroom');
    Route::get('create', 'ClassroomController@create') -> name('classroom.create');
    Route::post('create', 'ClassroomController@store') -> name('classroom.store');

    Route::get('{room_id}', 'ClassroomController@show') -> name('classroom.show');
});


Auth::routes();
