<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Provincias;
use Error;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class ProvinciasController extends Controller
{

    // Listar todos los paises
    public function listarProvincias( ){
        $ObjProvincias=null;
        try {
            //buscar si existe el usuario que realiza la peticion
            $ObjProvincias=Provincias::get();
            return response()->json(["mensaje"=>$ObjProvincias,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th,400]);
        }
    }


}
