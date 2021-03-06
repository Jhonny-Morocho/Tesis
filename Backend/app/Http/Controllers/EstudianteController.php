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

     public function listarPostulanteFormulario(Request $request){
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
     public function listarAllPostulantesFormulario(){
        //obtener todos los usuarios que sean postulante
        $ObjUsuario=Usuario::where('tipoUsuario',"=","2")
                                ->where('estado', '0')
                                ->get();
        $datos = array();
        foreach ($ObjUsuario as $key) {
            $datos [] = [
                "correo" => $key->correo,
                "externalUsuario" => $key->external_us,
                "nombreEstudiante" => self::getNombreEstudiante($key->external_us),
            ];
      
            }
       
        //     echo "<pre";
        // var_dump($ObjUsuario);
        // echo "</pre";
        //die(json_encode($$ObjUsuario->id));
            //print_r($ObjUsuario);
            //die(json_encode($ObjUsuario));
            // $ObjEstudiante = estudiante::where("fk_usuario","=", $ObjUsuario->id)->first();
            // foreach ($ObjUsuario as $key => $value) {
            //     echo $value['id']."---";
                
            // }
            //$ObjEstudiante = estudiante::where($value['id'],"=", $ObjUsuario->id)->first();
      return response()->json(["resultado" => $datos]);
        //     if($ObjUsuario!=null){
        //         $ObjEstudiante = estudiante::where("fk_usuario","=", $ObjUsuario->id)->first();
        //         if($ObjEstudiante !=null){
        //             return response()->json(["mensaje"=> $ObjEstudiante,"Siglas"=>"OE"]);
        //         }else{
        //            return response()->json(["mensaje"=>"Operacion No Exitosa, no existe registro de formulario del estudiante","Siglas"=>"ONE"]);
        //         }
   
        //    }else{
        //        return response()->json(["mensaje"=>"Operacion No Exitosa no se encontro el usuario external_us","Siglas"=>"ONE"]);
        //    }

    }

    private function getNombreEstudiante($externalUsuario)
    {
        $usuario = Usuario::where("external_us", $externalUsuario)->first();   

        $estudiante = Estudiante::where("fk_usuario","=",$usuario->id)->first();
          
        
            $info[] = [
                "nombre" => $estudiante->nombre
            ];
        // if ($estudiante) {
        //     $info= true;
        // }else{
        //     $info = false;
        // }
        return $info;
    }
}
