<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Usuario;
use App\Models\Docente;
use App\Models\Empleador;
//template para correo
use App\Traits\TemplateCorreo;
//permite traer la data del apirest
use Illuminate\Http\Request;
class EmpleadorController extends Controller{
    //reutilizando el codigo con los correos
    use TemplateCorreo;
    //obtener los datos del formulario del empleador para presentarlos o imprimir
    public function FormEmpleador(Request $request){
         if($request->json()){
             //validar si el usuario existe
             $ObjUsuario = Usuario::where("external_us",$request['external_us'])->first();
             if($ObjUsuario!=null){
                 $ObjEmpleador = Empleador::where("fk_usuario","=", $ObjUsuario->id)->first();
                 if($ObjEmpleador !=null){
                     return response()->json(["mensaje"=> $ObjEmpleador,"Siglas"=>"OE",200]);
                 }else{
                    return response()->json(["mensaje"=>"No existe registro del empleador","Siglas"=>"ONE"]);
                 }

            }else{
                return response()->json(["mensaje"=>"No se encontro el usuario external_us","Siglas"=>"ONE"]);
            }

         }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
         }
     }
     //aqui aprobamos o no al empleador//aprobamos al empleador
     public function actulizarAprobacionEmpleador(Request $request,$external_id){

         if($request->json()){
            $texto="";
            $handle = fopen("logRegistroEmpleador.txt", "a");
            $enviarCorreoBolean=null;
             try {
                 // ACTUALIZAR EL ESTADO DE VALIDACION DEL EMPLEADO
                 $ObjEmleador = Empleador::where("external_em","=",$external_id)
                ->update(array( 'estado'=>$request['estado'],
                'observaciones'=>$request['observaciones']));

                 //NOTIFICAR FORMULARIO APROBADO/ NO APROBADO AL EMPLEADOR
                 $usuarioEmpleador=Empleador::join("usuario","usuario.id","=","empleador.fk_usuario")
                 ->select("empleador.*","usuario.*")
                 ->where("usuario.tipoUsuario",6)
                 ->where("external_em",$external_id)
                 ->first();
                 // NOTIFICAR EL EMPLEADOR LA NO VALIDACION DEL FORMUARIO
                 if($request['estado']==0 ){
                    $parrafo="Su información de registro tiene algunas inconsistencias, por favor revise su información y vuelva a intentar";
                    $plantillaCorreo=
                        $this
                    ->templateHtmlCorreo($usuarioEmpleador['nom_representante_legal'],$parrafo);
                    $enviarCorreoBolean=
                        $this
                    ->enviarCorreo($plantillaCorreo,$usuarioEmpleador['correo'],getenv("TITULO_CORREO_EMPLEADOR"));

                    $texto="[".date("Y-m-d H:i:s")."]"
                    ." Validacion de formulario de empleador no aprobado :: Estado de correo enviado al empleador : "
                    .$enviarCorreoBolean.
                    " Correo del empleador ".$usuarioEmpleador['correo'].
                    " ]";
                    fwrite($handle, $texto);
                    fwrite($handle, "\r\n\n\n\n");
                    fclose($handle);
                }
                // NOTIFICAR EL EMPLEADOR LA VALIDACION DEL FORMULARIO
                if($request['estado']==1){//
                    $parrafo="Su información ha sido validada con éxito";
                    $plantillaHtmlCorreo=$this
                    ->templateHtmlCorreo(
                                        $usuarioEmpleador['nom_representante_legal'],
                                        $parrafo
                                        );
                    $enviarCorreoBolean=$this
                    ->enviarCorreo($plantillaHtmlCorreo,$usuarioEmpleador['correo'],getenv("TITULO_CORREO_EMPLEADOR"));

                    $texto="[".date("Y-m-d H:i:s")."]"
                    ." Validacion de formulario de empleador aprobado :: Estado de correo enviado al empleador : "
                    .$enviarCorreoBolean.
                    " Correo del empleador ".$usuarioEmpleador['correo'].
                    " ]";
                    fwrite($handle, $texto);
                    fwrite($handle, "\r\n\n\n\n");
                    fclose($handle);
                }
                return response()->json(["mensaje"=>"Registro Actualizado",
                                        "estadoCorreoEnviado"=>$enviarCorreoBolean,
                                        "ObjEmleador"=>$ObjEmleador,
                                        "Siglas"=>"OE",
                                        "respuesta"=>"Operación Exitosa"]);
             } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th->getMessage()]);
             }

         }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
         }

    }
    public function actulizarFormEmpleador(Request $request,$external_id){
        if($request->json()){
            $ObjUsuario=null;
            try {
                $ObjUsuario = usuario::where("external_us",$external_id)->first();
                if($ObjUsuario!=null){
                    //actualizamos los datos del formulario
                    $ObjEstudiante =
                        Empleador::where("fk_usuario","=", $ObjUsuario->id)
                        ->update(
                                array(
                                'razon_empresa'=>$request['razon_empresa'],
                                'tipo_empresa'=>$request['tipo_empresa'],
                                'actividad_ruc'=>$request['actividad_ruc'],
                                'num_ruc'=>$request['num_ruc'],
                                'cedula'=>$request['cedula'],
                                'nom_representante_legal'=>$request['nom_representante_legal'],
                                'fk_ciudad'=>$request['fk_ciudad'],
                                'fk_provincia'=>$request['fk_provincia'],
                                'telefono'=>$request['telefono'],
                                'direccion'=>$request['direccion'],
                                'observaciones'=>$request['observaciones']
                            ));
                    //debe exitir un usuario y a la vez la respuesta de al consulta sea true
                    if($ObjEstudiante !=null || $ObjEstudiante==true){
                        //enviarmos correo al encargado
                        $parrafo="Existe un nuevo registro de empleador pendiente en validar información";
                        $arrayEncargado=$this->enviarCorreoEncargadoFormEditadoRegistrado($request,$ObjUsuario,$parrafo);
                        return response()->json(["mensaje"=>$ObjEstudiante,
                                                 "estadoCorreoEnviado"=>$arrayEncargado,
                                                    "Siglas"=>"OE"]);
                    }else{
                       return response()->json(["mensaje"=>"No existe registro del empleador","Siglas"=>"ONE"]);
                    }

               }else{
                   return response()->json(["mensaje"=>"No se encontro el usuario external_em","Siglas"=>"ONE"]);
               }
            } catch (\Throwable $th) {
               return response()->json(["mensaje"=>$th->getMessage(),
                                        "respuestaObjUsuario"=> $ObjUsuario,
                                        "objEmpelador"=>$request->json()->all(),
                                        "Siglas"=>"ONE","error"=>$th->getMessage()]);
            }

        }else{
           return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }

    }
     // Listar todos los postulante estado cero y no cero//con sus datos de formulario
    public function listarEmpleadores(){
        //obtener todos los usuarios que sean postulante
        try {
            $ObjeEmpleador=null;
            $ObjeEmpleador=Empleador::join("usuario","usuario.id","empleador.fk_usuario")
            ->select("usuario.correo","empleador.*")
            ->where("usuario.tipoUsuario",6)
            ->get();
            return response()->json(["mensaje"=>$ObjeEmpleador,"Siglas"=>"OE","respuesta"=>"Operacion Exitosa"]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th->getMessage()]);
        }


    }
    //obtener empleador por url //external_us
    public function obtenerEmpleadorExternal_em(Request $request){
        if($request->json()){
            try {
                $ObjeEmpleador=null;
                $ObjeEmpleador=Empleador::where("external_em","=",$request['external_em'])->first();
                return $this->retornarRespuestaEstudianteEncontrado($ObjeEmpleador);

            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th->getMessage()]);
            }

        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }

    private function retornarRespuestaEstudianteEncontrado($ObjetoEstudiante){

        if($ObjetoEstudiante!=null){
            return response()->json(["mensaje"=>$ObjetoEstudiante,"Siglas"=>"OE","respuesta"=>"Operación Exitosa"]);
        }else{
            return response()->json(["mensaje"=>$ObjetoEstudiante,"Siglas"=>"ONE","respuesta"=>"No se encontro el empleador"]);
        }

    }
    //se crea un nuevo empleador
    public function RegistrarEmpleador(Request $request,$external_id){

        if($request->json()){
            $datos=$request->json()->all();
            $ObjUsuario=null;
            $ObjEmpleador=null;
            try {
                $ObjUsuario=Usuario::where("external_us",$external_id)
                ->where("tipoUsuario",6)
                ->first();
                $ObjEmpleador=new Empleador();
                $ObjEmpleador->fk_usuario=$ObjUsuario->id;
                $ObjEmpleador->razon_empresa=$datos["razon_empresa"];
                $ObjEmpleador->tipo_empresa=$datos["tipo_empresa"];
                $ObjEmpleador->actividad_ruc=$datos["actividad_ruc"];
                $ObjEmpleador->num_ruc=$datos["num_ruc"];
                $ObjEmpleador->cedula=$datos["cedula"];
                $ObjEmpleador->fk_ciudad=$datos["fk_ciudad"];
                $ObjEmpleador->fk_provincia=$datos["fk_provincia"];
                $ObjEmpleador->telefono=$datos["telefono"];
                $ObjEmpleador->direccion=$datos["direccion"];
                $ObjEmpleador->nom_representante_legal=$datos["nom_representante_legal"];
                $ObjEmpleador->observaciones=$datos["observaciones"];
                $ObjEmpleador->estado=$datos["estado"];
                $ObjEmpleador->external_em="Em".Utilidades\UUID::v4();
                $ObjEmpleador->save();
                $parrafo="Existe un nuevo empleador pendiente en aprobar la información del mismo";
                $arrayEncargado=$this->enviarCorreoEncargadoFormEditadoRegistrado($datos,$ObjUsuario,$parrafo);

                return response()->json(["mensaje"=> "Registro Exitoso","Siglas"=>"OE",
                                            "estadoCorreoEnviado"=>$arrayEncargado,
                                            "respuestaEmpleador"=>$ObjEmpleador,200]);
            } catch (\Throwable $th) {
                //throw $th;
                return response()->json(
                [
                    "mensaje"=>$th->getMessage(),
                    "Error en el servidor",
                    "respuestaObjUsuario"=>$ObjUsuario,
                    "respuestaObjEmpleador"=>$ObjEmpleador,
                    "Siglas"=>"ONE",
                    "error"=>$th->getMessage()
                ]);
            }
        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }

    private function enviarCorreoEncargadoFormEditadoRegistrado($datos,$ObjUsuario,$parrafo){
            //enviar correo del registro el encargado
            $texto="";
            $handle = fopen("logRegistroEmpleador.txt", "a");
            //enviamos registro de postulante a la secretaria a la secretaria
            $usuarioEncargado=Docente::join("usuario","usuario.id","=","docente.fk_usuario")
            ->select("docente.nombre",
            "docente.apellido",
            "usuario.*")
            ->where("usuario.estado",1)
            ->where("usuario.tipoUsuario",5)
            ->get();
            $arrayEncargado=null;
            //recorrer todos los usuario que sean encargado
            foreach ($usuarioEncargado as $key => $value) {
                //tengo q redacatra el menaje al encargado
                $plantillaHmtlCorreo=
                            $this->templateHtmlCorreo(
                                        $value["nombre"]." ".$value['apellido'],
                                        $parrafo
                                    );
                $enviarCorreoBolean=$this->enviarCorreo($plantillaHmtlCorreo,
                                                    $value['correo'],
                                                    getenv("TITULO_CORREO_EMPLEADOR"));

                $arrayEncargado[$key]=array("nombre"=>$value['nombre'],
                                            "apellido"=>$value['apellido'],
                                            "estadoEnvioCorreo"=>$enviarCorreoBolean,
                                            "correo"=>$value['correo'],
                                            );
                $texto="[".date("Y-m-d H:i:s")."]"
                ." Registro Formulario Empleador:: Estado de correo enviado al empleador : "
                .$enviarCorreoBolean
                ."::: Correo del encargado  es: ".$value['correo']
                ." Correo del empleador es :"
                .$ObjUsuario->correo." ]";
                fwrite($handle, $texto);
                fwrite($handle, "\r\n\n\n\n");
            }
            fclose($handle);

            return $arrayEncargado;
    }

}
