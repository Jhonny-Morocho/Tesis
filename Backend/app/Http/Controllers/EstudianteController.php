<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Usuario;
use App\Models\Docente;
use App\Models\Empleador;
use App\Models\Estudiante;
//permite traer la data del apirest
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\Foreach_;

use function PHPUnit\Framework\isEmpty;

class EstudianteController extends Controller
{
    //formulario de estudiante comparando el external_us y externarl_es
     public function FormEstudiante(Request $request){
         if($request->json()){
             //validar si el usuario existe
             $ObjUsuario = usuario::where("external_us",$request['external_us'])->first();
             if($ObjUsuario!=null){
                 $ObjEstudiante = estudiante::where("fk_usuario","=", $ObjUsuario->id)->first();
                 if($ObjEstudiante !=null){
                     return response()->json(["mensaje"=> $ObjEstudiante,"Siglas"=>"OE"]);
                 }else{
                    return response()->json(["mensaje"=>"Operacion No Exitosa, no existe registro de formulario del estudiante","Siglas"=>"ONE"]);
                 }
    
            }else{
                return response()->json(["mensaje"=>"Operacion No Exitosa no se encontro el usuario external_us","Siglas"=>"ONE"]);
            }

         }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
         }
     }
     // Listar todos los postulante con sus datos de formulario
     public function listarEstudiantes(Request $request){
        //obtener todos los usuarios que sean postulante
        if($request->json()){
            try {
                $ObjeEstudiante=null;
                switch ($request['estado']) {
                    case 0:
                        # USUARIO NO APROBADOS
                        $ObjeEstudiante=Estudiante::where("estado","=",0)->get();
                        return response()->json(["mensaje"=>$ObjeEstudiante,"Siglas"=>"OE","respuesta"=>"Operacion Exitosa"]);
                        break;
                    case 1:
                        # USUARIOS SI APROBADOS
                        $ObjeEstudiante=Estudiante::where("estado","=",0)->get();
                        return response()->json(["mensaje"=>$ObjeEstudiante,"Siglas"=>"OE","respuesta"=>"Operacion Exitosa"]);
                        break;
                    
                    default:
                        # code...
                        return response()->json(["mensaje"=>$ObjeEstudiante,"Siglas"=>"ONE","respuesta"=>"Operacion no exitosa"]);
                        break;
                }
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar los estudiante","Siglas"=>"ONE","error"=>$th]);
            }

        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }
    //obtener postulante por url //external_us
    public function obtenerPostulanteExternal_es(Request $request){

        if($request->json()){
            try {
                $ObjeEstudiante=null;
                switch ($request['estado']) {
                    case 0:
                        # USUARIO NO APROBADOS
                        
                        $ObjeEstudiante=Estudiante::where("external_es","=",$request['external_es'])->where("estado","=",0)->first();
                        return $this->retornarRespuestaEstudianteEncontrado($ObjeEstudiante);
                         break;
                     case 1:
                         # USUARIOS SI APROBADOS
                         $ObjeEstudiante=Estudiante::where("external_es","=",$request['external_es'])->where("estado","=",1)->first();
                         return $this->retornarRespuestaEstudianteEncontrado($ObjeEstudiante);
                         
                         break;
                     default:
                         # code...
                         return response()->json(["mensaje"=>$ObjeEstudiante,"Siglas"=>"ONE","respuesta"=>"Operacion no exitosa, estudiante no encontrado"]);
                         break;
                 }
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa, no se encontro el estudiante "+$request['external_es'],"Siglas"=>"ONE","error"=>$th]);
            }

        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }

    private function retornarRespuestaEstudianteEncontrado($ObjetoEstudiante){

        if($ObjetoEstudiante!=null){
            return response()->json(["mensaje"=>$ObjetoEstudiante,"Siglas"=>"OE","respuesta"=>"Operacion  Exitosa"]);
        }else{
            return response()->json(["mensaje"=>$ObjetoEstudiante,"Siglas"=>"ONE","respuesta"=>"Operacion No Exitosa, no se encontro el estudiante xxx"]);
        }

    }
}
