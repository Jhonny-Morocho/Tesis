<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar

use App\Models\TitulosAcademicos;
use App\Models\Estudiante;
use App\Models\Usuario;
use Error;
//permite traer la data del apirest
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class TitulosAcademicosController extends Controller
{
    //ssubir achivo
    public  function subirArchivo(Request $request){
        $ruta= '../../Archivos/Titulos';
        $archivoSubido=false;
        try {
            //code...
            $file = $request->file('file');
            $archivoNombre = time().$file->getClientOriginalName();
            if($file->move($ruta, $archivoNombre)){
                 $archivoSubido=true;
            }
            return response()->json([   "nombreArchivo"=> $archivoNombre,
                                        "estadoArchivo"=>$archivoSubido,
                                        "mensaje"=>"Operacion existosa",
                                        "Siglas"=>"OE"], 200);
        } catch (\Throwable $th) {
            return response()->json([
                                        "archivoSubido"=>$archivoSubido,
                                        "mensaje"=>"Operacion No Exitosa",
                                        "Siglas"=>"ONE","error"=>$th]);
        }
    }
    
    public function RegistrarTitulo(Request $request,$external_id){

        if($request->json()){
            //obtengo todos los datos y lo guardo en la variable datos
            $datos=$request->json()->all();
            //creamos un objeto de tipo usuario para enviar los datos
            try {
                //buscar si existe el usuario que realiza la peticion
                $ObjUsuario=Usuario::where("external_us",$external_id)->first();
                //busco si ese usuario es un estudiante 
                $Objestudiante=Estudiante::where("fk_usuario","=",$ObjUsuario->id)->first();
                //die(json_encode($datos));
                $ObjTituloAcademico=new TitulosAcademicos();
                $ObjTituloAcademico->fk_estudiante=$Objestudiante->id;
                $ObjTituloAcademico->titulo_obtenido=$datos["titulo_obtenido"];
                $ObjTituloAcademico->numero_registro=$datos["numero_registro"];
                $ObjTituloAcademico->estado=$datos["estado"];
                $ObjTituloAcademico->tipo_titulo=$datos["tipo_titulo"];
                $ObjTituloAcademico->nivel_instruccion=$datos["nivel_instruccion"];
                $ObjTituloAcademico->detalles_adiciones=$datos["detalles_adiciones"];
                $ObjTituloAcademico->evidencias_url=$datos["evidencias_url"];
                $ObjTituloAcademico->external_ti="Ti".Utilidades\UUID::v4();
                $ObjTituloAcademico->save();
                //respuesta exitoso o no en la inserrccion
                return response()->json(["mensaje"=>"Operacion Exitosa","Siglas"=>"OE",200,]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$datos,"Siglas"=>"ONE","error"=>$th]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
 
    }
    public function actulizarTitulo(Request $request,$external_id){
        if($request->json()){
            try {
                //code...
                //die(json_encode($datos));
                $ObjTituloAcademico=TitulosAcademicos::where("external_ti","=", $external_id)->update(
                                                                        array(
                                                                        'titulo_obtenido'=>$request['titulo_obtenido'], 
                                                                        'numero_registro'=>$request['numero_registro'],
                                                                        'estado'=>$request['estado'],
                                                                        'tipo_titulo'=>$request['tipo_titulo'],
                                                                        'nivel_instruccion'=>$request['nivel_instruccion'],
                                                                        'detalles_adiciones'=>$request['detalles_adiciones'],
                                                                        'evidencias_url'=>$request['evidencias_url']
                                                                ));
                //respuesta exitoso o no en la inserrccion
                return response()->json(["mensaje"=>"Operacion Exitosa","Siglas"=>"OE",200]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa","Siglas"=>"ONE","error"=>$th]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
    }

    //terminar de hacer
    public function eliminarTitulo(Request $request,$external_id){
        if($request->json()){
            try {
                //code...
                //die(json_encode($datos));
                $ObjTituloAcademico=TitulosAcademicos::where("external_ti","=", $external_id)->update(
                                                                        array(
                                                                        'titulo_obtenido'=>$request['titulo_obtenido'], 
                                                                        'numero_registro'=>$request['numero_registro'],
                                                                        'estado'=>$request['estado'],
                                                                        'tipo_titulo'=>$request['tipo_titulo'],
                                                                        'nivel_instruccion'=>$request['nivel_instruccion'],
                                                                        'detalles_adiciones'=>$request['detalles_adiciones'],
                                                                        'evidencias_url'=>$request['evidencias_url']
                                                                ));
                //respuesta exitoso o no en la inserrccion
                return response()->json(["mensaje"=>"Operacion Exitosa","Siglas"=>"OE",200]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa","Siglas"=>"ONE","error"=>$th]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
    }
        // Listar todos los postulante estado cero y no cero//con sus datos de formulario
    public function listarTituloEstudiante( $external_id){
        //obtener todos los usuarios que sean postulante
        try {
            //buscar si existe el usuario que realiza la peticion
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            //busco si ese usuario es un estudiante 
            $Objestudiante=Estudiante::where("fk_usuario","=",$ObjUsuario->id)->first();
            $titulosAcademicos=TitulosAcademicos::where("fk_estudiante","=",$Objestudiante->id)->orderBy('id', 'DESC')->get();
            return response()->json(["mensaje"=>$titulosAcademicos,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar los estudiante","Siglas"=>"ONE","error"=>$th,400]);
        }
    }
    //obtener tutlo por url //external_ti
    public function obtenerTituloExternal_ti($external_id ){
        try {
            $ObjTitulo=null;
            $ObjTitulo=TitulosAcademicos::where("external_ti","=",$external_id)->first();
            return $this->retornarTituloEncontrado($ObjTitulo);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se encontro el registro "+$external_id,"Siglas"=>"ONE","error"=>$th]);
        }

     
    }

    private function retornarTituloEncontrado($ObjTitulo){
        if($ObjTitulo!=null){
            return response()->json(["mensaje"=>$ObjTitulo,"Siglas"=>"OE","respuesta"=>"Operacion  Exitosa"]);
        }else{
            return response()->json(["mensaje"=>$ObjTitulo,"Siglas"=>"ONE","respuesta"=>"Operacion No Exitosa, no se encontro el titulo"]);
        }
    }
    
}
