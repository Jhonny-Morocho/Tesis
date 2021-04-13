<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar

use App\Models\Encuesta;

//permite traer la data del apirest
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class EncuestaController extends Controller
{
  
  
    //registrar curso y capacitaciones
    public function registrar(Request $request){
        if($request->json()){
            try {
                //code...
                $datos=$request->json()->all();
                $ObjCusosCapacitaciones=new Encuesta();
                die("ya llegue perro");
                $ObjCusosCapacitaciones->fk_pais=1;
                $ObjCusosCapacitaciones->nom_evento=$datos["nom_evento"];
                $ObjCusosCapacitaciones->tipo_evento=$datos["tipo_evento"];
                $ObjCusosCapacitaciones->auspiciante=$datos["auspiciante"];
                $ObjCusosCapacitaciones->horas=$datos["horas"];
                $ObjCusosCapacitaciones->estado=$datos["estado"];
                $ObjCusosCapacitaciones->fecha_inicio=$datos["fecha_inicio"];
                $ObjCusosCapacitaciones->fecha_culminacion=$datos["fecha_culminacion"];
                $ObjCusosCapacitaciones->evidencia_url=$datos["evidencia_url"];
                $ObjCusosCapacitaciones->external_en="En".Utilidades\UUID::v4();
                $ObjCusosCapacitaciones->save();
                //die(json_encode($ObjCusosCapacitaciones));
                //respuesta exitoso o no en la inserrccion
                return response()->json(["mensaje"=>"Operacion Exitosa","Siglas"=>"OE","Objeto"=>$ObjCusosCapacitaciones,200,]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa","Siglas"=>"ONE","reques"=>$request->json()->all(),"error"=>$th]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF","reques"=>$request->json()->all(),400]);
        }
 
    }
    // Listar todos los titulos estado cero y no cero//con sus datos de formulario
    public function listarCursosCapacitaciones( $external_id){
        $titulosAcademicos=null;
        //obtener todos los usuarios que sean postulante
        try {
            //buscar si existe el usuario que realiza la peticion
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            //busco si ese usuario es un estudiante 
            $Objestudiante=Estudiante::where("fk_usuario","=",$ObjUsuario->id)->first();
            $titulosAcademicos=CursosCapacitaciones::where("fk_estudiante","=",$Objestudiante->id)->where("estado","=","1")->orderBy('id', 'DESC')->get();
            return response()->json(["mensaje"=>$titulosAcademicos,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$titulosAcademicos,"Siglas"=>"ONE","error"=>$th,400]);
        }
    }
    public function actulizarCursoCapacitaciones(Request $request,$external_id){
        //die(json_encode($request->json()->all()));
        if($request->json()){
            $actulizoArchivo=false;
            try {
                //actulizo el archivo , por lo cual actulizo la evidencias_url
                if($request['evidencias_url']!=null){
                    $actulizoArchivo=true;
                    $ObjCursosCapacitaciones=CursosCapacitaciones::where("external_cu","=", $external_id)->update(
                                                                            array(
                                                                            'nom_evento'=>$request['nom_evento'], 
                                                                            'tipo_evento'=>$request['tipo_evento'],
                                                                            'auspiciante'=>$request['auspiciante'],
                                                                            'horas'=>$request['horas'],
                                                                            'fk_pais'=>$request['fk_pais'],
                                                                            'fecha_inicio'=>$request['fecha_inicio'],
                                                                            'fecha_culminacion'=>$request['fecha_culminacion'],
                                                                            'evidencia_url'=>$request['evidencia_url']

                                                                            
                                                                    ));
                }
                //solo actualizo la data 
                else{
       
                    $ObjCursosCapacitaciones=CursosCapacitaciones::where("external_cu","=", $external_id)->update(
                        array(
                            'nom_evento'=>$request['nom_evento'], 
                            'tipo_evento'=>$request['tipo_evento'],
                            'auspiciante'=>$request['auspiciante'],
                            'horas'=>$request['horas'],
                            'fk_pais'=>$request['fk_pais'],
                            'fecha_inicio'=>$request['fecha_inicio'],
                            'fecha_culminacion'=>$request['fecha_culminacion']
                    ));
                }
                return response()->json(["mensaje"=>"Operacion Exitosa","Objeto"=>$ObjCursosCapacitaciones,"actulizoArchivo"=>$actulizoArchivo,"resques"=>$request->json()->all(),"respuesta"=>$ObjCursosCapacitaciones,"Siglas"=>"OE",200]);
                //respuesta exitoso o no en la inserrccion
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa","resques"=>$request->json()->all(),"Siglas"=>"ONE","error"=>$th]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
    }

    //obtener curos-capacitacion por url //external_ti
    public function obtenerCursoCapacitacionExternal_cu($external_id ){
        try {
            $ObjTitulo=null;
            $ObjTitulo=CursosCapacitaciones::where("external_cu","=",$external_id)->first();
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
     //terminar de hacer
     public function eliminarCursoCapicitacion(Request $request){
        try {
            //actualizo el texto plano 
            $ObjTituloAcademico=CursosCapacitaciones::where("external_cu","=", $request['external_cu'])->update(array('estado'=>$request['estado']));
            //borro el archivo
            $bandera_borrar=false;
            $UbicacionArchivo=$this->ruta."/".$request['evidencia_url'];
            if(file_exists($UbicacionArchivo)){ 
                if(unlink($UbicacionArchivo)) 
                $bandera_borrar=true; 
            }
            return response()->json(["mensaje"=>"Operacion Exitosa",
                                     "Siglas"=>"OE","banderaBorrar"=>$bandera_borrar,
                                     "Respuesta"=>$ObjTituloAcademico,200]);
        
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa","Siglas"=>"ONE","error"=>$th]);
        }
     
    }
}
