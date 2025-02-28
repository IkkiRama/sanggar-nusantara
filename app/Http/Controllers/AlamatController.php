<?php

namespace App\Http\Controllers;

use App\Models\Alamat;
use Illuminate\Http\Request;

class AlamatController extends Controller
{
    public function index() { return response()->json(Alamat::all()); }
    public function show($id) { return response()->json(Alamat::findOrFail($id)); }
    public function store(Request $request) {
        $alamat = Alamat::create($request->all());
        return response()->json($alamat, 201);
    }
    public function update(Request $request, $id) {
        $alamat = Alamat::findOrFail($id);
        $alamat->update($request->all());
        return response()->json($alamat);
    }
    public function destroy($id) {
        Alamat::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
