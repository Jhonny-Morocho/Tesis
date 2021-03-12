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
        $router->post('/empleador/registro/{external_id}','EmpleadorController@RegistrarEmpleador');
        $router->post('/usuario/login','UsuarioController@login');
        // consultar formulario registrado
        $router->post('/estudiante/FormEstudiante','EstudianteController@FormEstudiante');
        $router->post('/empleador/formEmpleador','EmpleadorController@FormEmpleador');
        //consular todos los postulante que tienen formularior registrado
        $router->get('/estudiante/listarEstudiantes','EstudianteController@listarEstudiantes');
        $router->get('/empleador/listarEmpleadores','EmpleadorController@listarEmpleadores');
        $router->post('/estudiante/obtenerPostulanteExternal_es','EstudianteController@obtenerPostulanteExternal_es');
        $router->post('/empleador/obtenerEmpleadorExternal_em','EmpleadorController@obtenerEmpleadorExternal_em');
        $router->post('/estudiante/actulizarAprobacionEstudiante/{external_id}','EstudianteController@actulizarAprobacionEstudiante');
        $router->post('/empleador/actulizarAprobacionEmpleador/{external_id}','EmpleadorController@actulizarAprobacionEmpleador');
        $router->post('/estudiante/actulizarFormEstudiante/{external_id}','EstudianteController@actulizarFormEstudiante');
        $router->post('/empleador/actulizarFormEmpleador/{external_id}','EmpleadorController@actulizarFormEmpleador');
        //titulos-academicos//verifico el external_us, para saber cual el id del postulante
        $router->get('/titulos-academicos/obtenerTituloExternal_ti/{external_id}','TitulosAcademicosController@obtenerTituloExternal_ti');
        $router->post('/titulos-academicos/registro/{external_id}','TitulosAcademicosController@RegistrarTitulo');
        $router->post('/titulos-academicos/actulizarTitulo/{external_id}','TitulosAcademicosController@actulizarTitulo');
        $router->get('/titulos-academicos/listarTitulosEstudiante/{external_id}','TitulosAcademicosController@listarTituloEstudiante');
        $router->post('/titulos-academicos/subirArchivo','TitulosAcademicosController@subirArchivo');
        //cursos-capacitaciones//verifico el external_us, para saber cual el id del postulante
        $router->post('/cursos-capacitaciones/registro/{external_id}','CursosCapacitacionesController@RegistrarCursoCapacitaciones');
   // });
} catch (\Throwable $th) {
    echo "PROBLEMAS CON LAS RUTAS PROTEGIDAS";
    throw $th;
}