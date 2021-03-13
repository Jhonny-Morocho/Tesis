<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar

use App\Models\CursosCapacitaciones;
use App\Models\Estudiante;
use App\Models\Usuario;
use Error;
//permite traer la data del apirest
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class CursosCapacitacionesController extends Controller
{
    //Registrar Usuario
    
    public function RegistrarCursoCapacitaciones(Request $request,$external_id){
        //code...
        if($request->json()){
            //obtengo todos los datos y lo guardo en la variable datos
            $datos=$request->json()->all();
            //pregunto si el extern_us es del usuario que realiza la peticion
            $Objestudiante=Estudiante::where("external_es",$external_id)->first();
            //creamos un objeto de tipo usuario para enviar los datos
            try {
                //code...
                $ObjCusosCapacitaciones=new CursosCapacitaciones();
                $ObjCusosCapacitaciones->fk_estudiante=$Objestudiante->id;
                $ObjCusosCapacitaciones->fk_pais=$datos["fk_pais"];
                $ObjCusosCapacitaciones->nom_evento=$datos["nom_evento"];
                $ObjCusosCapacitaciones->tipo_evento=$datos["tipo_evento"];
                $ObjCusosCapacitaciones->auspiciante=$datos["auspiciante"];
                $ObjCusosCapacitaciones->horas=$datos["horas"];
                $ObjCusosCapacitaciones->estado=$datos["estado"];
                $ObjCusosCapacitaciones->fecha_inicio=$datos["fecha_inicio"];
                $ObjCusosCapacitaciones->fecha_culminacion=$datos["fecha_culminacion"];
                $ObjCusosCapacitaciones->evidencia_url=$datos["evidencia_url"];
                $ObjCusosCapacitaciones->external_cu="Cu".Utilidades\UUID::v4();
                $ObjCusosCapacitaciones->save();
                //die(json_encode($ObjCusosCapacitaciones));
                //respuesta exitoso o no en la inserrccion
                return response()->json(["mensaje"=>"Operacion Exitosa","Siglas"=>"OE",200,]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa","Siglas"=>"ONE","error"=>$th]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
 
    }
    // Listar todos los titulos estado cero y no cero//con sus datos de formulario
    public function listarCursosCapacitaciones( $external_id){
        //obtener todos los usuarios que sean postulante
        try {
            //buscar si existe el usuario que realiza la peticion
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            //busco si ese usuario es un estudiante 
            $Objestudiante=Estudiante::where("fk_usuario","=",$ObjUsuario->id)->first();
            $titulosAcademicos=CursosCapacitaciones::where("fk_estudiante","=",$Objestudiante->id)->where("estado","=","1")->orderBy('id', 'DESC')->get();
            return response()->json(["mensaje"=>$titulosAcademicos,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar los estudiante","Siglas"=>"ONE","error"=>$th,400]);
        }
    }
    
}
