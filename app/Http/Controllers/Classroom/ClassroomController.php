<?php

namespace App\Http\Controllers\Classroom;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ClassroomController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')
            ->only(['create','store']);
    }

    public function overview(){
        return view('classroom.index');
    }

    public function create(){
        return view('classroom.create');
    }

    public function store(){
        return view('classroom.create');
    }

    public function show(){
        return view('classroom.show');
    }
}
