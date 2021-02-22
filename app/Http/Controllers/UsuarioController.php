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

            //creamos un objeto de tipo usuario para enviar los datos
            $ObjUsuario=new Usuario();
            $ObjUsuario->correo=$datos["correo"];
            $ObjUsuario->nombre=$datos["nombre"];
            $ObjUsuario->apellido=$datos["apellido"];
            $ObjUsuario->tipoUsuario=$datos["tipoUsuario"];
            $ObjUsuario->estado=$datos["estado"];
            $ObjUsuario->external_us=$datos["external_us"];
            $ObjUsuario->contraseña=$datos["contraseña"];
            //$ObjUsuario->correo=$datos["nombre"];
            $ObjUsuario->save();
         

            //respuesta exitoso o no en la inserrccion
            return response()->json(["mensaje"=>"Operacion exitosa","siglas"=>"OE",200]);
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","siglas"=>"DNF",400]);
        }
    }
}
