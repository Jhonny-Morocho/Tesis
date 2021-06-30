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
    private  $ruta= '../../Archivos/Titulos';
    public  function subirArchivo(Request $request){

        $archivoSubido=false;
        try {
            //code...
            $file = $request->file('file');
            $archivoNombre = time().$file->getClientOriginalName();
            if($file->move($this->ruta, $archivoNombre)){
                 $archivoSubido=true;
            }
            return response()->json([   "nombreArchivo"=> $archivoNombre,
                                        "estadoArchivo"=>$archivoSubido,
                                        "mensaje"=>"Operación exitosa",
                                        "Siglas"=>"OE"], 200);
        } catch (\Throwable $th) {
            return response()->json([
                                        "archivoSubido"=>$archivoSubido,
                                        "mensaje"=>$th->getMessage(),
                                        "Siglas"=>"ONE","error"=>$th->getMessage()]);
        }
    }
    public function eliminarArchivo($nombreArchivo){
        $archivoUbicacion=$this->ruta."/".$nombreArchivo;
        if(unlink($archivoUbicacion)){
            return true;
        }else{
            return false;
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
                return response()->json(["mensaje"=>"Operación Exitosa","Siglas"=>"OE",200,]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th->getMessage()]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }

    }
    public function actulizarTitulo(Request $request,$external_id){
        if($request->json()){
            $actulizoArchivo=false;
            $archivoEliminado=null;
            try {
                //actulizo el archivo , por lo cual actulizo la evidencias_url
                if($request['evidencias_url']!=null){
                    $actulizoArchivo=true;
                    $ObjTituloAcademico=TitulosAcademicos::where("external_ti","=", $external_id)->update(
                                                                            array(
                                                                            'titulo_obtenido'=>$request['titulo_obtenido'],
                                                                            'numero_registro'=>$request['numero_registro'],
                                                                            'tipo_titulo'=>$request['tipo_titulo'],
                                                                            'nivel_instruccion'=>$request['nivel_instruccion'],
                                                                            'detalles_adiciones'=>$request['detalles_adiciones'],
                                                                            'evidencias_url'=>$request['evidencias_url']
                                                                    ));
                    //eliminar el archivo anterior
                    $archivoEliminado=$this->eliminarArchivo($request['evidencias_url_antiguo']);
                }
                //solo actualizo la data
                else{

                    $ObjTituloAcademico=TitulosAcademicos::where("external_ti","=", $external_id)->update(
                        array(
                        'titulo_obtenido'=>$request['titulo_obtenido'],
                        'numero_registro'=>$request['numero_registro'],
                        'tipo_titulo'=>$request['tipo_titulo'],
                        'nivel_instruccion'=>$request['nivel_instruccion'],
                        'detalles_adiciones'=>$request['detalles_adiciones']
                    ));
                }
                return response()->json(["mensaje"=>
                                         "Operacion Exitosa",
                                         "Objeto"=>$ObjTituloAcademico,
                                         "archivoEliminado"=>$archivoEliminado,
                                         "actulizoArchivo"=>$actulizoArchivo,
                                         "resques"=>$request->json()->all(),
                                         "respuesta"=>$ObjTituloAcademico,"Siglas"=>"OE",200]);
                //respuesta exitoso o no en la inserrccion
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$th->getMessage(),
                                            "resques"=>$request->json()->all(),
                                            "Siglas"=>"ONE",
                                            "error"=>$th->getMessage()]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
    }

    //terminar de hacer
    public function eliminarTitulo(Request $request){
        try {
            //actualizo el texto plano
            $ObjTituloAcademico=TitulosAcademicos::where("external_ti","=", $request['external_ti'])->update(array('estado'=>$request['estado']));
            //borro el archivo
            $bandera_borrar=false;
            $UbicacionArchivo=$this->ruta."/".$request['evidencias_url'];
            if(file_exists($UbicacionArchivo)){
                if(unlink($UbicacionArchivo))
                $bandera_borrar=true;
            }
            return response()->json(["mensaje"=>"Operacion Exitosa",
                                     "Siglas"=>"OE","banderaBorrar"=>$bandera_borrar,
                                     "Respuesta"=>$ObjTituloAcademico,200]);

        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th]);
        }

    }
    // Listar todos los titulos estado cero y no cero//con sus datos de formulario
    public function listarTituloEstudiante( $external_id){
        //obtener todos los usuarios que sean postulante
        $titulosAcademicos=null;
        try {
            //buscar si existe el usuario que realiza la peticion
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            //busco si ese usuario es un estudiante
            $Objestudiante=Estudiante::where("fk_usuario","=",$ObjUsuario->id)->first();
            $titulosAcademicos=TitulosAcademicos::where("fk_estudiante","=",$Objestudiante->id)->where("estado","=",1)->orderBy('id', 'DESC')->get();
            return response()->json(["mensaje"=>$titulosAcademicos,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$th->getMessage(),
                                    "Siglas"=>"ONE","error"=>$th->getMessage(),"external"=>$external_id,400]);
        }
    }
    //obtener tutlo por url //external_ti
    public function obtenerTituloExternal_ti($external_id ){
        try {
            $ObjTitulo=null;
            $ObjTitulo=TitulosAcademicos::where("external_ti","=",$external_id)->first();
            return $this->retornarTituloEncontrado($ObjTitulo);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th]);
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
