<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});


try {
    //code...
    
    //$router->group(['middleware' => 'auth'], function () use ($router) {
        //envaimos a guardar datos (end pint,controladador/)
        $router->post('/usuario/registro','UsuarioController@RegistrarUsuario');
        $router->post('/docente/registro/{external_id}','UsuarioController@RegistrarDocente');
        $router->post('/estudiante/registro/{external_id}','UsuarioController@RegistrarEstudiante');
        $router->post('/empleador/registro/{external_id}','UsuarioController@RegistrarEmpleador');
        $router->post('/usuario/login','UsuarioController@login');
        // consultar formulario registrado
        $router->post('/estudiante/FormEstudiante','EstudianteController@FormEstudiante');
        //consular todos los postulante que tienen formularior registrado
        $router->post('/estudiante/listarEstudiantes','EstudianteController@listarEstudiantes');
        $router->post('/estudiante/obtenerPostulanteExternal_es','EstudianteController@obtenerPostulanteExternal_es');
        $router->post('/estudiante/actulizarAprobacionEstudiante/{external_id}','EstudianteController@actulizarAprobacionEstudiante');
    
   // });
} catch (\Throwable $th) {
    echo "PROBLEMAS CON LAS RUTAS PROTEGIDAS";
    throw $th;
}