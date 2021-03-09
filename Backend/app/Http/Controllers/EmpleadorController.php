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
     public function actulizarAprobacionEmpleador(Request $request,$external_id){
         if($request->json()){
             try {
                 $ObjEstudiante = Empleador::where("external_em","=",$external_id)->update(array( 'estado'=>$request['estado'], 'observaciones'=>$request['observaciones']));
                 return response()->json(["mensaje"=>$ObjEstudiante,"Siglas"=>"OE","respuesta"=>"Operacion Exitosa"]);
             } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede actulizar el postulante","Siglas"=>"ONE","error"=>$th]);
             }

         }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
         }

    }
    public function actulizarFormEmpleador(Request $request,$external_id){
        //die(json_encode($request->json()->all()));
        if($request->json()){
            try {

                $ObjUsuario = usuario::where("external_us",$external_id)->first();
                if($ObjUsuario!=null){
                    $ObjEstudiante = 
                        Empleador::where("fk_usuario","=", $ObjUsuario->id)->update(
                                                                                    array( 
                                                                                        
                                                                                    'razon_empresa'=>$request['razon_empresa'], 
                                                                                    'tipo_empresa'=>$request['tipo_empresa'],
                                                                                    'actividad_ruc'=>$request['actividad_ruc'],
                                                                                    'num_ruc'=>$request['num_ruc'],
                                                                                    'cedula'=>$request['cedula'],
                                                                                    'nom_representante_legal'=>$request['nom_representante_legal'],
                                                                                    'ciudad'=>$request['ciudad'],
                                                                                    'provincia'=>$request['provincia'],
                                                                                    'telefono'=>$request['telefono'],
                                                                                    'provincia'=>$request['provincia'],
                                                                                    'direccion'=>$request['direccion'],
                                                                                    'observaciones'=>$request['observaciones']
                                                                            
                                                                               ));
                    //debe exitir un usuario y a la vez la respuesta de al consulta sea true 
                    if($ObjEstudiante !=null || $ObjEstudiante==true){
                        return response()->json(["mensaje"=> $ObjEstudiante,"Siglas"=>"OE"]);
                    }else{
                       return response()->json(["mensaje"=>"Operacion No Exitosa, no existe registro de formulario del empleador","Siglas"=>"ONE"]);
                    }
       
               }else{
                   return response()->json(["mensaje"=>"Operacion No Exitosa no se encontro el usuario external_em","Siglas"=>"ONE"]);
               }

             
                
            } catch (\Throwable $th) {
               return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede actulizar el empleador","Siglas"=>"ONE","error"=>$th]);
            }

        }else{
           return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }

   }
     // Listar todos los postulante estado cero y no cero//con sus datos de formulario
     public function listarEmpleadores(){
        //obtener todos los usuarios que sean postulante
        try {
            $ObjeEstudiante=null;
            $ObjeEstudiante=Empleador::get();
            return response()->json(["mensaje"=>$ObjeEstudiante,"Siglas"=>"OE","respuesta"=>"Operacion Exitosa"]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar los estudiante","Siglas"=>"ONE","error"=>$th]);
        }

  
    }
    //obtener postulante por url //external_us
    public function obtenerEmpleadorExternal_em(Request $request){
        if($request->json()){
            try {
                $ObjeEstudiante=null;
                $ObjeEstudiante=Empleador::where("external_em","=",$request['external_em'])->first();
                return $this->retornarRespuestaEstudianteEncontrado($ObjeEstudiante);
                 
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa, no se encontro el empleador "+$request['external_es'],"Siglas"=>"ONE","error"=>$th]);
            }

        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }

    private function retornarRespuestaEstudianteEncontrado($ObjetoEstudiante){

        if($ObjetoEstudiante!=null){
            return response()->json(["mensaje"=>$ObjetoEstudiante,"Siglas"=>"OE","respuesta"=>"Operacion  Exitosa"]);
        }else{
            return response()->json(["mensaje"=>$ObjetoEstudiante,"Siglas"=>"ONE","respuesta"=>"Operacion No Exitosa, no se encontro el estudiante "]);
        }

    }
}
