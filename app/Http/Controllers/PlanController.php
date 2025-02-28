<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index() {
        return Plan::with('subscriptions')->get();
    }
    public function store(Request $request) {
        return Plan::create($request->all());
    }
}
