<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar

use App\Models\Docente;
use App\Models\Usuario;
use App\Models\Estudiante;
//permite traer la data del apirest
use Illuminate\Http\Request;
//template para correo
use App\Traits\TemplateCorreo;


class EstudianteController extends Controller
{

    //reutilizando el codigo con los correos
    use TemplateCorreo;
    //obtener los datos del formulario del estudiante llenado/o no llenadao
    public function FormEstudiante(Request $request){
        if($request->json()){
            //validar si el usuario existe
            $ObjUsuario = usuario::where("external_us",$request['external_us'])->first();
            if($ObjUsuario!=null){
                $ObjEstudiante = estudiante::where("fk_usuario","=", $ObjUsuario->id)->first();
                if($ObjEstudiante !=null){

                    return response()->json(["mensaje"=> $ObjEstudiante,

                                            "Siglas"=>"OE"]);
                }else{
                return response()->json(["mensaje"=>"No existe formulario del estudiante","Siglas"=>"ONE"]);
                }

            }else{
                return response()->json(["mensaje"=>"No se encontro el usuario external_us","Siglas"=>"ONE"]);
            }

        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }
     //actulizar dato de postulante//estudainte
    public function actulizarAprobacionEstudiante(Request $request,$external_id){
         if($request->json()){
            $texto="";
            $handle = fopen("logRegistroPostulante.txt", "a");
            $arraycorreoRespuesta=array();
             try {
                 $ObjEstudiante = Estudiante::where("external_es","=",$external_id)->update(array( 'estado'=>$request['estado'], 'observaciones'=>$request['observaciones']));
                 //notificar al correo sobre la aprobacion y no aprobacion
                 $usuarioEstudiante=Estudiante::join("usuario","usuario.id","=","estudiante.fk_usuario")
                 ->select("estudiante.*","usuario.*")
                 ->where("usuario.tipoUsuario",2)
                 ->where("external_es",$external_id)
                 ->first();
                // la secretaria notifca al postulante que su informacion no ha sido validada
                if($request['estado']==0 ){
                    $parrafoMensaje="Su información tiene algunas inconsistencias,
                                     por favor revise su informacion y vuelva a intentar";
                    $plantillaCorreo=
                        $this->templateHtmlCorreo(
                            $usuarioEstudiante['nombre']." ".$usuarioEstudiante['apellido'],
                            $parrafoMensaje
                            );
                    $enviarCorreoBolean=
                        $this->enviarCorreo(
                                        $plantillaCorreo,$usuarioEstudiante['correo'],
                                        getenv("TITULO_CORREO_POSTULANTE")
                                        );

                //notificar a la secretaria sobre el nuevo registro //o reenvio de infomracion

                    $texto="[".date("Y-m-d H:i:s")."]" ." Registro Postulante informacion no validada Correo por parte de la secrataria : ".$enviarCorreoBolean." ]";
                    fwrite($handle, $texto);
                    fwrite($handle, "\r\n\n\n\n");
                    fclose($handle);
                }

                 // la secretartia notifica al postulante de su registro exitoso, se notifica al encargado y al postulante
                if($request['estado']==1){// validacion exitosa
                    //ENVIAMOS LOS CORREOS TANTO AL ENCARGADO Y AL POSTULANTE

                    //1.ENVIAMO AL POSUTLOANTE LA APROBACION
                    $plantillaHtmlCorreo=
                        $this->templateHtmlCorreo(
                                                $usuarioEstudiante['nombre']." ".$usuarioEstudiante['apellido'],
                                                 "Su información ha salido validada exitosamente"
                                                );
                    $enviarCorreoBolean=$this->enviarCorreo(
                                                            $plantillaHtmlCorreo,
                                                            $usuarioEstudiante['correo'],
                                                            getenv("TITULO_CORREO_POSTULANTE")
                                                            );
                    //2. ENVIAMOS EL CORREO AL ENCARGADO
                     $usuarioEncargado=Docente::join("usuario","usuario.id","=","docente.fk_usuario")
                     ->select("docente.*","usuario.*")
                     ->where("docente.estado",1)
                     ->where("usuario.tipoUsuario",5)
                     ->get();
                     //enviamo el correo
                     $parrafo= "El postulante  <b>".
                                 $usuarioEstudiante['nombre'].
                                 " ".$usuarioEstudiante['apellido'].
                                 "</b> ha sido validado con éxito";
                     foreach ($usuarioEncargado as $key => $value) {
                        //generara plantilla html
                        $plantillaCorreoEncargado=
                            $this->templateHtmlCorreo(
                                                        $value['nombre']." ".$value['apellido'],
                                                        $parrafo
                                                    );
                        //enviar correo
                         $enviarCorreoBoolean=
                            $this->enviarCorreo(
                                                $plantillaCorreoEncargado,
                                                $value['correo'],
                                                getenv("TITULO_CORREO_POSTULANTE")
                                                );
                         $arraycorreoRespuesta[$key]=array("nombre"=>$value['nombre'],
                                                     "apellido"=>$value['apellido'],
                                                     "estadoEnvioCorreo"=>$enviarCorreoBoolean,
                                                     "correo"=>$value['correo'],
                                                     );
                        $texto="[".date("Y-m-d H:i:s")."]" ." Aprobar validacion de formulario de estudiante notficar al estudiante y al encargado Correo  : ".$enviarCorreoBolean." El correo del encargado es : ".$value['correo']."  ]";
                        fwrite($handle, $texto);
                        fwrite($handle, "\r\n\n\n\n");
                    }
                    fclose($handle);
                }
                 // si la validacion no es exitosa se le comina al estudiante que revise su informaicon
                return response()->json(["mensaje"=>$ObjEstudiante,"Siglas"=>"OE",
                                            "correoEstadoEstudiante"=> $enviarCorreoBolean,
                                            "correoEstadoEncargado"=> $arraycorreoRespuesta,
                                            "respuesta"=>"Operacion Exitosa"]);

             } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"No se puede actulizar el postulante","Siglas"=>"ONE","error"=>$th]);
             }

         }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
         }

    }
    //actualizar form del postulan del postulante
    public function actulizarFormEstudiante(Request $request,$external_id){

        if($request->json()){
            $texto="";
            $handle = fopen("logRegistroPostulante.txt", "a");
            $arraycorreoRespuesta=array();
            try {
                $ObjUsuario = usuario::where("external_us",$external_id)->first();
                if($ObjUsuario!=null){
                        $ObjEstudiante =
                        estudiante::where("fk_usuario","=", $ObjUsuario->id)
                                    ->update(
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
                        //cuando el estudiante vuelve a reenviar le formulario tambien se notifica a la secreatria
                        //enviamos registro de postulante a la secretaria a la secretaria
                        $usuarioSecrataria=Docente::join("usuario","usuario.id","=","docente.fk_usuario")
                        ->select("docente.*","usuario.*")
                        ->where("usuario.estado",1)
                        ->where("usuario.tipoUsuario",3)
                        ->get();
                        $parrafo="Existe un nuevo registro de postulante pendiente en validar información";
                        foreach ($usuarioSecrataria as $key => $value) {
                            //tengo q redacatra el menaje a la secretaria
                            $plantillaHmtlCorreo=$this->templateHtmlCorreo(
                                                    $value["nombre"]." ".$value["apellido"],
                                                    $parrafo
                                                );

                            $enviarCorreoBolean=
                                $this->enviarCorreo(
                                                    $plantillaHmtlCorreo,
                                                    $value['correo'],
                                                    getenv("TITULO_CORREO_POSTULANTE")
                                                    );
                            $arraycorreoRespuesta[$key]=array("nombre"=>$value['nombre'],
                                                        "apellido"=>$value['apellido'],
                                                        "estadoEnvioCorreo"=>$enviarCorreoBolean,
                                                        "correo"=>$value['correo'],
                                                        );
                            $texto="[".date("Y-m-d H:i:s")."]" ." Reenviando Formulario a la secretaria con los datos corregidos Correo  : ".$enviarCorreoBolean." ]";
                            fwrite($handle, $texto);
                        }
                        fwrite($handle, "\r\n\n\n\n");
                        fclose($handle);

                    return response()->json(["mensaje"=> $ObjEstudiante,
                                                "etadoCorreo"=> $arraycorreoRespuesta,
                                                "Siglas"=>"OE"]);
                    }else{
                       return response()->json(["mensaje"=>"No existe formulario del estudiante","Siglas"=>"ONE"]);
                    }
                }else{
                   return response()->json(["mensaje"=>"No se encontro el usuario external_us","Siglas"=>"ONE"]);
               }
            } catch (\Throwable $th) {
               return response()->json(["mensaje"=>$th->getMessage(),
                                            "request"=>$request->json()->all(),
                                            "Siglas"=>"ONE",
                                            "error"=>$th->getMessage()]);
            }

        }else{
           return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }

    }

     // Listar todos los postulante estado cero y no cero//con sus datos de formulario
    public  function listarEstudiantes(){
        //obtener todos los usuarios que sean postulante
        try {
            $ObjeEstudiante=null;
            $ObjeEstudiante=Estudiante::join("usuario","usuario.id","=","estudiante.fk_usuario")
            ->select("usuario.*","estudiante.*")
            ->where("usuario.tipoUsuario",2)
            ->get();
            return response()->json(["mensaje"=>$ObjeEstudiante,"Siglas"=>"OE","respuesta"=>"Operacion Exitosa"]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th]);
        }

    }
    //=================== FUNCIONE PRIVADAS =================================//
    //=================== FUNCIONE PRIVADAS =================================//
    //=================== FUNCIONE PRIVADAS =================================//
    //obtener postulante por url //external_us
    public function obtenerPostulanteExternal_es(Request $request){

        if($request->json()){
            try {
                $ObjeEstudiante=null;
                $ObjeEstudiante=Estudiante::where("external_es","=",$request['external_es'])->first();
                return $this->retornarRespuestaEstudianteEncontrado($ObjeEstudiante);

            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"No se encontro el estudiante "+$request['external_es'],"Siglas"=>"ONE","error"=>$th]);
            }

        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }

    private function retornarRespuestaEstudianteEncontrado($ObjetoEstudiante){

        if($ObjetoEstudiante!=null){
            return response()->json(["mensaje"=>$ObjetoEstudiante,"Siglas"=>"OE","respuesta"=>"Operación  Exitosa"]);
        }else{
            return response()->json(["mensaje"=>$ObjetoEstudiante,"Siglas"=>"ONE","respuesta"=>"No se encontro el estudiante xxx"]);
        }

    }


}
