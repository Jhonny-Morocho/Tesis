<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Usuario;
use App\Models\Docente;

//permite traer la data del apirest
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    //Registrar Usuario
    public function RegistrarUsuario(Request $request){
        if($request->json()){
            //obtengo todos los datos y lo guardo en la variable datos
            $datos=$request->json()->all();

        }
    }
}
