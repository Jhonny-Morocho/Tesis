<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Ciudades;

class CiudadesController extends Controller
{
    
    // Listar todos los paises
    public function listarCiudades($external_id){
        $ObjCiudades=null;
        try {
            //buscar si existe el usuario que realiza la peticion
            $ObjCiudades=Ciudades::join("provincia","provincia.id","=","ciudad.fk_provincia")
            ->select("provincia.nombre","ciudad.*")
            ->where("ciudad.fk_provincia",$external_id)
            ->get();
            return response()->json(["mensaje"=>$ObjCiudades,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$ObjCiudades,"Siglas"=>"ONE","error"=>$th,400]);
        }
    }

    
}
