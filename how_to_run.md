# How to run instructions
## Prerequisites
In order to run this project you have to install Docker v24.0.7 (or greater) in your system

## Terminal Commands
In order to build the app and the DB in Docker open a terminal and launch the command:

<code>docker compose up</code>

Wait that all is built, then you can launch the test in the docker terminal of the container <b>breezbeers_docker-myapp-1<b/>

To do this, first launch <code>docker exec -it breezbeers_docker-myapp-1 sh</code> to enter in the container running the app.

Once you are in the container terminal, you can launch the automatic test (Unit and Features) from the command:

<code>php artisan test</code>

If with your browser you go to http://localhost:8000 you can see the Home Page, clicking register on top right of the page you can register in the system and then automatically login with the given credentials in the registration process.

When you are logging in, you see the Token created when login in the dashboard page, in the same page you can click the button that calls internal api passing the token.

After click the button, after some seconds you can see the data paginated in the searchable and sortable Table.
