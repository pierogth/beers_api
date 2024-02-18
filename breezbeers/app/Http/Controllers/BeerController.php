<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Http;

class BeerController extends Controller
{
    /**
     * Display the beers
     */
    public function index(Request $request)/* : Response */
    { 
        //taking the token from the request
        $token = $request->header('Authorization');
        // Parse the token value from the header
        $tokenValue = explode(' ', $token)[1] ?? null;
        //compare the token in the the request with the one stored in session when login
        if($tokenValue===$request->session()->get('token')){
            //correct token, doing the call to punk
            $response = Http::get('https://api.punkapi.com/v2/beers', [
                            'page' => 1,
                            'per_page' => 80,
                        ]);


            if ($response->successful()) {
                $beers = $response->json();
            } else {

            return response()->json(['status' => 'error', 'message' => 'An error occurred while fetching the beers.']);
              
            }
            }else {
                return response()->json(['status' => 'error', 'message' => $tokenValue.'---'.$request->session()->get('token')]);
            }
            return response()->json(['status' => 'success', 'data' => $beers ]);
    }

 
}
