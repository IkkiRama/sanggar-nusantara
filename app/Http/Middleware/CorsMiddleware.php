<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->getMethod() == "OPTIONS") {
            return response()->json([], 200);
        }

        return $next($request)
            ->header('Access-Control-Allow-Origin', 'http://sanggar-nusantara.test')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Authorization, Accept, X-Requested-With')
            ->header('Access-Control-Allow-Credentials', 'true');
    }

}
