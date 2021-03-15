<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar

use App\Models\Empleador;
use App\Models\OfertasLaborales;
use App\Models\Usuario;
use Error;
//permite traer la data del apirest
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class OfertaLaboralController extends Controller
{
  

    //registrar curso y capacitaciones
    public function RegistrarOfertaLaboral(Request $request,$external_id){
        //code...
        if($request->json()){
            //obtengo todos los datos y lo guardo en la variable datos
            $datos=$request->json()->all();
            //buscar si existe el usuario que realiza la peticion
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            //pregunto si el extern_us es del usuario que realiza la peticion el empleador
            $ObjEmpleador=Empleador::where("fk_usuario","=",$ObjUsuario->id)->first();
            //creamos un objeto de tipo ofertaLaborales para enviar los datos
            try {
                //code...
                $ObjOfertasLaborales=new OfertasLaborales();
                $ObjOfertasLaborales->fk_empleador=$ObjEmpleador->id;
                $ObjOfertasLaborales->puesto=$datos["puesto"];
                $ObjOfertasLaborales->descripcion=$datos["descripcion"];
                $ObjOfertasLaborales->lugar=$datos["lugar"];
                $ObjOfertasLaborales->obervaciones=$datos["obervaciones"];
                $ObjOfertasLaborales->requisitos=$datos["requisitos"];
                $ObjOfertasLaborales->estado=$datos["estado"];
                $ObjOfertasLaborales->external_of="Of".Utilidades\UUID::v4();
                $ObjOfertasLaborales->save();
                return response()->json(["mensaje"=>"Operacion Exitosa","Siglas"=>"OE","Objeto"=>$ObjOfertasLaborales,200,]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa","Siglas"=>"ONE","reques"=>$request->json()->all(),"error"=>$th]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF","reques"=>$request->json()->all(),400]);
        }
 
    }
    // Listar todos los titulos estado cero y no cero//con sus datos de formulario
    public function listarOfertasLaboralesExternal_us( $external_id){
        //obtener todos los usuarios que sean postulante
        try {
            //buscar si existe el usuario que realiza la peticion
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            //busco si ese usuario es un estudiante 
            $ObjEmpleador=Empleador::where("fk_usuario","=",$ObjUsuario->id)->first();
            $titulosAcademicos=OfertasLaborales::where("fk_empleador","=",$ObjEmpleador->id)->orderBy('id', 'DESC')->get();
            return response()->json(["mensaje"=>$titulosAcademicos,"Siglas"=>"OE","fechaCreacion"=>($ObjEmpleador->updated_at)->format('Y-m-d'),200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar los estudiante","Siglas"=>"ONE","error"=>$th,400]);
        }
    }
    public function actulizarOfertaLaboral(Request $request,$external_id){
        if($request->json()){

            try {           
                $ObjOfertaLaboral=OfertasLaborales::where("external_of","=", $external_id)->update(
                    array(
                        'puesto'=>$request['puesto'], 
                        'descripcion'=>$request['descripcion'],
                        'lugar'=>$request['lugar'],
                        'requisitos'=>$request['requisitos']
                    ));
                
                return response()->json(["mensaje"=>"Operacion Exitosa","Objeto"=>$ObjOfertaLaboral,"resques"=>$request->json()->all(),"respuesta"=>$ObjOfertaLaboral,"Siglas"=>"OE",200]);
                //respuesta exitoso o no en la inserrccion
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa","resques"=>$request->json()->all(),"Siglas"=>"ONE","error"=>$th]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
    }

    //obtener oferta-laboral por url //external_ti
    public function obtenerOfertaLaboralExternal_of($external_id ){
        try {
            $ObjOfertaLaboral=null;
            $ObjOfertaLaboral=OfertasLaborales::where("external_of","=",$external_id)->first();
            return $this->retornarOfertaLaboralEncontrado($ObjOfertaLaboral);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se encontro el registro "+$external_id,"Siglas"=>"ONE","error"=>$th]);
        }
    }

    private function retornarOfertaLaboralEncontrado($ObjTitulo){
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
