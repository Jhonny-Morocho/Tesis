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
use PhpParser\Node\Stmt\TryCatch;

use function PHPUnit\Framework\isEmpty;

class EmpleadorController extends Controller
{
    //formulario de estudiante comparando el external_us y externarl_es//creamos un estudiante
     public function FormEmpleador(Request $request){
         if($request->json()){
             //validar si el usuario existe
             $ObjUsuario = Usuario::where("external_us",$request['external_us'])->first();
             if($ObjUsuario!=null){
                 $ObjEstudiante = Empleador::where("fk_usuario","=", $ObjUsuario->id)->first();
                 if($ObjEstudiante !=null){
                     die(json_encode($ObjEstudiante));
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
     //actulizar dato de postulante//estudainte
     public function actulizarAprobacionEstudiante(Request $request,$external_id){
         if($request->json()){
             try {
                 $ObjEstudiante = estudiante::where("external_es","=",$external_id)->update(array( 'estado'=>$request['estado'], 'observaciones'=>$request['observaciones']));
                 return response()->json(["mensaje"=>$ObjEstudiante,"Siglas"=>"OE","respuesta"=>"Operacion Exitosa"]);
                 
             } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede actulizar el postulante","Siglas"=>"ONE","error"=>$th]);
             }

         }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
         }

    }
    public function actulizarFormEstudiante(Request $request,$external_id){

        if($request->json()){
            try {

                $ObjUsuario = usuario::where("external_us",$external_id)->first();
                if($ObjUsuario!=null){
                    $ObjEstudiante = 
                        estudiante::where("fk_usuario","=", $ObjUsuario->id)->update(
                                                                                    array( 'cedula'=>$request['cedula'], 
                                                                                    'telefono'=>$request['telefono'],
                                                                                    'nombre'=>$request['nombre'],
                                                                                    'apellido'=>$request['apellido'],
                                                                                    'genero'=>$request['genero'],
                                                                                    'fecha_nacimiento'=>$request['fecha_nacimiento'],
                                                                                    'direccion_domicilio'=>$request['direccion_domicilio'],
                                                                                    'observaciones'=>$request['observaciones']
                                                                               ));
                    //debe exitir un usuario y a la vez la respuesta de al consulta sea true 
                    if($ObjEstudiante !=null || $ObjEstudiante==true){
                        return response()->json(["mensaje"=> $ObjEstudiante,"Siglas"=>"OE"]);
                    }else{
                       return response()->json(["mensaje"=>"Operacion No Exitosa, no existe registro de formulario del estudiante","Siglas"=>"ONE"]);
                    }
       
               }else{
                   return response()->json(["mensaje"=>"Operacion No Exitosa no se encontro el usuario external_us","Siglas"=>"ONE"]);
               }

             
                
            } catch (\Throwable $th) {
               return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede actulizar el postulante","Siglas"=>"ONE","error"=>$th]);
            }

        }else{
           return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }

   }
     // Listar todos los postulante estado cero y no cero//con sus datos de formulario
     public function listarEstudiantes(){
        //obtener todos los usuarios que sean postulante
        try {
            $ObjeEstudiante=null;
            $ObjeEstudiante=Estudiante::get();
            return response()->json(["mensaje"=>$ObjeEstudiante,"Siglas"=>"OE","respuesta"=>"Operacion Exitosa"]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar los estudiante","Siglas"=>"ONE","error"=>$th]);
        }

  
    }
    //obtener postulante por url //external_us
    public function obtenerPostulanteExternal_es(Request $request){

        if($request->json()){
            try {
                $ObjeEstudiante=null;
                $ObjeEstudiante=Estudiante::where("external_es","=",$request['external_es'])->first();
                return $this->retornarRespuestaEstudianteEncontrado($ObjeEstudiante);
                 
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
