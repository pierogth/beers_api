<?php

use App\Http\Controllers\BeerController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Tests\TestCase;
use App\Models\User;


class SessionTokenTest extends TestCase
{
    /**
     * Test the index method of the controller with a valid token.
     *
     * @return void
     */
    public function testIndexWithValidToken()
    {
      $user = User::factory()->create();

        $response = $this->post("/login", [
            "name" => $user->name,
            "password" => "password",
        ]);

        $this->assertAuthenticated();

         // Get the session token
        $token = Session::get('token');

        //dd($token);

        // Make a real request to the beers endpoint
        $request = Request::create('/api/beers', 'GET');
        $request->headers->set('Authorization', 'Bearer ' . $token);

       
        // Call the index method with the mocked request
        //$response = (new BeerController())->index($request);
     $response = $this->get("/api/beers", ['Authorization'=>'Bearer ' . $token]);

    //dd($response);
        // Assert that the response is a JSON response with a 'success' status
        $response->assertJson([
            'status' => 'success',
        ]);

       
    }
}