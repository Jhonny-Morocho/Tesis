<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Usuario;
use App\Models\Docente;
use App\Models\Estudiante;
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
            $ObjUsuario->external_us="UuA".Utilidades\UUID::v4();
            $ObjUsuario->contraseña=$datos["contraseña"];
            $ObjUsuario->save();
            //respuesta exitoso o no en la inserrccion
            return response()->json(["mensaje"=>"Operacion exitosa","siglas"=>"OE",200]);
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","siglas"=>"DNF",400]);
        }
    }

    //Registrar docente
    //(obtengo todos los datos del formulario,el id a comparar)
    public function RegistrarDocente(Request $request,$external_id){
        if($request->json()){
            $datos=$request->json()->all();
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            // tipo de usuario decente ==1
            if($ObjUsuario->tipoUsuario==1){
                //creo un objeto Docente para guardar el nuevo decente
                $ObjDocente=new Docente();
                $ObjDocente->fk_usuario=$ObjUsuario->id;
                $ObjDocente->tipo_docente=$datos["tipo_docente"];
                $ObjDocente->external_do="Doc".Utilidades\UUID::v4();
                $ObjDocente->save();
           
                return response()->json(["mensaje"=>"Operacion Exitosa","Siglas"=>"OE"]);
            }else{
                return response()->json(["mensaje"=>"Operacion No Exitosa","Siglas"=>"ONE"]);
            }
        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }
    public function RegistrarEstudiante(Request $request,$external_id){
        if($request->json()){
            $datos=$request->json()->all();
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            if($ObjUsuario->tipoUsuario==2){
                //creo un objeto Docente para guardar el nuevo decente
                $ObjEstudiante=new Estudiante();
                $ObjEstudiante->fk_usuario=$ObjUsuario->id;
                $ObjEstudiante->cedula=$datos["cedula"];
                $ObjEstudiante->telefono=$datos["telefono"];
                $ObjEstudiante->genero=$datos["genero"];
                $ObjEstudiante->fecha_nacimiento=$datos["fecha_nacimiento"];
                $ObjEstudiante->observaciones=$datos["observaciones"];
                $ObjEstudiante->external_us="Es".Utilidades\UUID::v4();
                $ObjEstudiante->save();
                return response()->json(["mensaje"=>"Operacion Exitosa","Siglas"=>"OE"]);
            }else{
                return response()->json(["mensaje"=>"Operacion No Exitosa no se encontro el usuario external","Siglas"=>"ONE"]);
            } 
                
        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }
}
