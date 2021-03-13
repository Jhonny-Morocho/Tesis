<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Paises;
use Error;
//permite traer la data del apirest
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class PaisesController extends Controller
{
    
    // Listar todos los paises
    public function listarPaises( ){
        try {
            //buscar si existe el usuario que realiza la peticion
            $ObjPaises=Paises::get();
            return response()->json(["mensaje"=>$ObjPaises,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar los estudiante","Siglas"=>"ONE","error"=>$th,400]);
        }
    }

    
}
