<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar

use App\Models\Empleador;
use App\Models\OfertasLaborales;
use App\Models\Estudiante;
use App\Models\OfertaLaboralEstudiante;
use App\Models\Usuario;
use Error;
//permite traer la data del apirest
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class OfertaLaboralEstudianteController extends Controller
{
  
    //el estudiante postula a una oferta laboral//
    public function listarTodasOfertaEstudianteExternal_us($external_id){
        try {
            $ObjEstudiante=$this->buscarEstudiante($external_id);
            $ObjOfertaEstudiante=
            OfertaLaboralEstudiante::join('oferta_laboral','oferta_laboral.id','ofertalaboral_estudiante.fk_oferta_laboral')
            ->select('oferta_laboral.puesto','ofertalaboral_estudiante.*')
            ->where('ofertalaboral_estudiante.fk_estudiante',$ObjEstudiante['id'])->get();
            return response()->json(["mensaje"=>$ObjOfertaEstudiante,"Siglas"=>"OE",200]);
            
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa",
                                        "Siglas"=>"ONE","error"=>$th]);
        }
    }
    public function PostularOfertaLaboral(Request $request,$external_id){
        if($request->json()){
            $datos=$request->json()->all();
            //comprobar el usuario es un estudiante
            try {
                $ObjEstudiante=$this->buscarEstudiante($external_id);
                //buscamos la oferta laboral
                $OfertaLaboral=$this->buscarOfertaLaboral($datos['external_of']);
                //comprobar si el etudainte no postule dos veces a la misma oferta
                $ValidarPostularUnaOfertaNVeces=$this->validarEstNoPostuleNVecesMismaOfert($ObjEstudiante['id'],$OfertaLaboral['id']);
                if($ValidarPostularUnaOfertaNVeces==false){
                    //si no repite la misma postulacion entonces si puede inscribirse
                        $ObjOfertaLaboralEstudiante=new OfertaLaboralEstudiante();
                        $ObjOfertaLaboralEstudiante->fk_estudiante=$ObjEstudiante['id'];
                        $ObjOfertaLaboralEstudiante->fk_oferta_laboral=$OfertaLaboral['id'];
                        $ObjOfertaLaboralEstudiante->estado=$request['estado'];
                        $ObjOfertaLaboralEstudiante->observaciones=$request['observaciones'];
                        $ObjOfertaLaboralEstudiante->external_of_est="OfEst".Utilidades\UUID::v4();
                        $ObjOfertaLaboralEstudiante->save();
                        return response()->json(["mensaje"=>"Operacion Exitosa",
                                                    "Siglas"=>"OE",
                                                    "OferEstudiante"=>$ObjOfertaLaboralEstudiante,
                                                200]);
                }else{
                    return response()->json(["mensaje"=>"Usted ya esta postulando a esta oferta","Siglas"=>"ONE",200]);
                }
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa",
                                        "Siglas"=>"ONE",
                                        "estudiante"=>$ObjEstudiante,
                                        "ofertaLaboral"=>$OfertaLaboral,
                                        "request"=>$request->json()->all(),"error"=>$th]);
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
            //4 estado //0== eliminado,1==activo,2==aprobado,3==rechazado
            $ObjOfertaLaboral=OfertasLaborales::where("fk_empleador","=",$ObjEmpleador->id)->where("estado","!=","0")->orderBy('id', 'DESC')->get();
            return response()->json(["mensaje"=>$ObjOfertaLaboral,"Siglas"=>"OE","fechaCreacion"=>($ObjEmpleador->updated_at)->format('Y-m-d'),200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar la oferta","Siglas"=>"ONE","error"=>$th,400]);
        }
    }
    // listamos todos los estudiante que han postulado a una oferta xxx
    public function listTodasEstudiantePostulanOfertaExternal_of($external_id){
        //obtener todos los usuarios que sean postulante
        $EstudiantePostulanOfertaExternal_of=null;
        try {
            //buscamos la oferta laboral el id , de la oferta laboral
            $ObjOfertaLaboral=$this->buscarOfertaLaboral($external_id);
            $EstudiantePostulanOfertaExternal_of=OfertaLaboralEstudiante::join("estudiante","estudiante.id","=","ofertalaboral_estudiante.fk_estudiante")
            ->join("usuario","usuario.id","=","estudiante.fk_usuario")
            ->select("estudiante.*","usuario.*")
            ->where('ofertalaboral_estudiante.estado',"=",1)
            ->where("ofertalaboral_estudiante.fk_oferta_laboral", "=", $ObjOfertaLaboral->id)->get();
           return response()->json(["mensaje"=>$EstudiantePostulanOfertaExternal_of,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$EstudiantePostulanOfertaExternal_of,"Siglas"=>"ONE","error"=>$th,400]);
        }
    }
    // Listar todos los titulos estado cero y no cero//con sus datos de formulario
    public function listarOfertasLaboralesValidadasEncargado(){
        //obtener todos los usuarios que sean postulante
        try {
            
            //obtenemos las que ya estan aprobado usario ==2 y las que se tienen que publicar ==3
            $ObjOfertasLaborales=OfertaLaboralEstudiante::get();
            return response()->json(["mensaje"=>$ObjOfertasLaborales,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar las ofertas laborales","Siglas"=>"ONE","error"=>$th,400]);
        }
    }
    public function actulizarOfertaLaboral(Request $request,$external_id){
        if($request->json()){

            try {           
                $ObjOfertaLaboral=OfertasLaborales::where("external_of","=", $external_id)->update(
                    array(
                        'puesto'=>$request['puesto'], 
                        'descripcion'=>$request['descripcion'],
                        'estado'=>$request['estado'],
                        'lugar'=>$request['lugar'],
                        'obervaciones'=>$request['obervaciones'],
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


     public function eliminarPostulanteOfertaLaboral(Request $request){
         $OfertaLaboralPostulanteBorrar=null;
        try {
            //buscamos la oferta laboral
            $ObjOfertaLaboral=$this->buscarOfertaLaboral($request['external_of']);
            //buscamos al estudiante
            $ObjEstudiante=$this->buscarEstudiante($request['external_us']);
            //buscamos el estudiante que este postulando a esa oferta
            $OfertaLaboralPostulante=OfertaLaboralEstudiante::join("estudiante","estudiante.id","=","ofertalaboral_estudiante.fk_estudiante")
            ->join("oferta_laboral","oferta_laboral.id","=","ofertalaboral_estudiante.fk_oferta_laboral")
            ->where('ofertalaboral_estudiante.fk_estudiante','=',$ObjEstudiante->id)
            ->where("ofertalaboral_estudiante.fk_oferta_laboral", "=", $ObjOfertaLaboral->id)
            ->first();
            //actualizo el estado del estudiante que postulo a una oferta x , estado 0
            $OfertaLaboralPostulanteBorrar=OfertaLaboralEstudiante::where("external_of_est","=", $OfertaLaboralPostulante->external_of_est)->update(
                                array(
                                    'estado'=>$request['estado']
                                ));

            return response()->json(["mensaje"=>"Operacion Exitosa","Siglas"=>"OE",
                                     "respuesta"=>$OfertaLaboralPostulanteBorrar,200]);
        
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Error no se puede borrar","respuesta"=>$OfertaLaboralPostulanteBorrar,
                                    "Siglas"=>"ONE","error"=>$th]);
        }
     
    }

    //================ FUNCIONES RECURSIVAS =======================//
    //bucar estudiante
    private function  buscarEstudiante($external_us){
        try {
            //code...
            $ObjUsuario=Usuario::where("external_us",$external_us)->first();
            $ObjEstudiante=Estudiante::where("fk_usuario",$ObjUsuario->id)->first();
            if($ObjEstudiante){
                return $ObjEstudiante;
            }else{
                //ONE
                return "ONE";
            }
        } catch (\Throwable $th) {
            return $th;
        }
    }
    //bucamos la oferta laboral
    private function  buscarOfertaLaboral($external_of){
        try {
            $ObjOfertaLaboral=OfertasLaborales::where("external_of",$external_of)->first();
            if($ObjOfertaLaboral){
                return $ObjOfertaLaboral;
            }else{
                return "ONE";
            }
        } catch (\Throwable $th) {
            return $th;
        }
    }
    // validar que el estudainte no postule dos veces a la misma oferta
    private function validarEstNoPostuleNVecesMismaOfert($fk_estudiante,$fk_ofertaLoral){
        try {
            //code...
            $ObjOfertaLaboralEstudiante=OfertaLaboralEstudiante::where ('fk_estudiante',$fk_estudiante)->where('fk_oferta_laboral',$fk_ofertaLoral)->first();
            if($ObjOfertaLaboralEstudiante){
                // si exiet el usuarui entonces reggresa mensaje
                //si encontro
                return true;
            }else{
                //no esta postulando a la misma oferta
                return false;
            }
            return $ObjOfertaLaboralEstudiante;
        } catch (\Throwable $th) {
            return $th;
        }
    }
}
