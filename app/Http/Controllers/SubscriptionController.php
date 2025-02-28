<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function index() {
        return Subscription::with(['user', 'plan'])->get();
    }
    public function store(Request $request) {
        return Subscription::create($request->all());
    }
}
