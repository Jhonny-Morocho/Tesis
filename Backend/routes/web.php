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
        $router->post('/usuario/recuperarPassword','UsuarioController@recuperarPassword');
        $router->post('/usuario/actualizarPassword','UsuarioController@actualizarPassword');
        $router->post('/docente/registro/{external_id}','DocenteController@registrarDocente');
        $router->get('/docente/listarDocentes','DocenteController@listarDocentes');
        $router->post('/docente/editarDocentes/{external_id}','DocenteController@editarDocente_external_us');
        $router->get('/docente/obtenerDocente_external_us/{external_id}','DocenteController@obtenerDocente_external_us');
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
        $router->post('/titulos-academicos/eliminarTitulo','TitulosAcademicosController@eliminarTitulo');
        $router->post('/titulos-academicos/registro/{external_id}','TitulosAcademicosController@RegistrarTitulo');
        $router->post('/titulos-academicos/actulizarTitulo/{external_id}','TitulosAcademicosController@actulizarTitulo');
        $router->get('/titulos-academicos/listarTitulosEstudiante/{external_id}','TitulosAcademicosController@listarTituloEstudiante');
        $router->post('/titulos-academicos/subirArchivo','TitulosAcademicosController@subirArchivo');
        //cursos-capacitaciones//verifico el external_us, para saber cual el id del postulante
        $router->post('/cursos-capacitaciones/registro/{external_id}','CursosCapacitacionesController@RegistrarCursoCapacitaciones');
        $router->get('/cursos-capacitaciones/obtenerCursoCapacitacionExternal_cu/{external_id}','CursosCapacitacionesController@obtenerCursoCapacitacionExternal_cu');
        $router->get('/cursos-capacitaciones/listarCursosCapacitaciones/{external_id}','CursosCapacitacionesController@listarCursosCapacitaciones');
        $router->post('/cursos-capacitaciones/subirArchivo','CursosCapacitacionesController@subirArchivo');
        $router->post('/cursos-capacitaciones/actulizarCursoCapacitaciones/{external_id}','CursosCapacitacionesController@actulizarCursoCapacitaciones');
        $router->post('/cursos-capacitaciones/eliminarCursoCapicitacion','CursosCapacitacionesController@eliminarCursoCapicitacion');
        //ofertasLaboraolesEstuidante
        $router->get('/ofertasLaboralesEstudiantes/reporteOfertaEstudiante','OfertaLaboralEstudianteController@reporteOfertaEstudiante');
        $router->post('/ofertasLaboralesEstudiantes/eliminarPostulanteOfertaLaboral','OfertaLaboralEstudianteController@eliminarPostulanteOfertaLaboral');
        $router->post('/ofertasLaboralesEstudiantes/finalizarOfertaLaboralEstudiante','OfertaLaboralEstudianteController@finalizarOfertaLaboralEstudiante');
        $router->get('/ofertasLaboralesEstudiantes/listarTodasOfertaEstudianteExternal_us/{external_id}','OfertaLaboralEstudianteController@listarTodasOfertaEstudianteExternal_us');
        $router->get('/ofertasLaboralesEstudiantes/listTodasEstudiantePostulanOfertaExternal_of_encargado/{external_id}','OfertaLaboralEstudianteController@listTodasEstudiantePostulanOfertaExternal_of_encargado');
        $router->get('/ofertasLaboralesEstudiantes/resumenOfertaEstudiantesFinalizada_external_of/{external_id}','OfertaLaboralEstudianteController@resumenOfertaEstudiantesFinalizada_external_of');
        $router->get('/ofertasLaboralesEstudiantes/listTodasEstudiantePostulanOfertaExternal_of_empleador/{external_id}','OfertaLaboralEstudianteController@listTodasEstudiantePostulanOfertaExternal_of_empleador');
        $router->get('/ofertasLaboralesEstudiantes/listTodasOfertasLaboralesEstudiante/{external_id}','OfertaLaboralEstudianteController@listTodasOfertasLaboralesEstudiante');
        $router->post('/ofertasLaboralesEstudiantes/PostularOfertaLaboral/{external_id}','OfertaLaboralEstudianteController@PostularOfertaLaboral');
        //paises
        $router->get('/paises/listarPaises','PaisesController@listarPaises');
        //ciudades
        $router->get('/ciudades/listarCiudades/{external_id}','CiudadesController@listarCiudades');
        //provincias
        $router->get('/provincias/listarProvincias','ProvinciasController@listarProvincias');
        //calificar empleador
        $router->get('/calificar-empleador/promedioCalificacionEmpleador/{external_id}','CalificarEmpleadorController@promedioCalificacionEmpleador');
        $router->get('/calificar-empleador/promedioCalificacionEmpleadorTodos','CalificarEmpleadorController@promedioCalificacionEmpleadorTodos');
        //encuesta
        $router->post('/encuesta/registrar','EncuestaController@registrar');
        $router->get('/encuesta/listarTodasEncuestas','EncuestaController@listarTodasEncuestas');

        //calificar empleador
        $router->post('/calificar-empleador/calificarEmpleador','CalificarEmpleadorController@calificarEmpleador');
        //ofertas-laborales
        $router->post('/ofertas-laborales/reactivar-oferta-laboral/{external_id}','OfertaLaboralController@reactivarOfertaLaboral');
        $router->get('/ofertas-laborales/listarOfertasLaboralesValidadasEncargado','OfertaLaboralController@listarOfertasLaboralesValidadasEncargado');
        $router->get('/ofertas-laborales/listarOfertasLaboralesValidadasGestor','OfertaLaboralController@listarOfertasLaboralesValidadasGestor');
        $router->get('/ofertas-laborales/listarTodasLasOfertasLaborales','OfertaLaboralController@listarTodasLasOfertasLaborales');
        $router->post('/ofertas-laborales/eliminarOfertaLaboral','OfertaLaboralController@eliminarOfertaLaboral');
        $router->post('/ofertas-laborales/actulizarOfertaLaboral/{external_id}','OfertaLaboralController@actulizarOfertaLaboral');
        $router->post('/ofertas-laborales/finalizarOfertaLaboral/{external_id}','OfertaLaboralController@finalizarOfertaLaboral');
        $router->post('/ofertasLaboralesEstudiantes/contrarPostulantes','OfertaLaboralEstudianteController@contrarPostulantes');
        $router->get('/ofertas-laborales/obtenerOfertaLaboralExternal_of/{external_id}','OfertaLaboralController@obtenerOfertaLaboralExternal_of');
        $router->post('/ofertas-laborales/registro/{external_id}','OfertaLaboralController@RegistrarOfertaLaboral');
        $router->get('/ofertas-laborales/listarOfertasLaboralesExternal_us/{external_id}','OfertaLaboralController@listarOfertasLaboralesExternal_us');
   // });
} catch (\Throwable $th) {
    echo "PROBLEMAS CON LAS RUTAS PROTEGIDAS";
    throw $th;
}
