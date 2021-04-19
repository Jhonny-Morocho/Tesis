<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar

use App\Models\Docente;
use App\Models\Usuario;
use App\Models\Estudiante;
//permite traer la data del apirest
use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;


class EstudianteController extends Controller
{   
    //correo de le emplesa
    private $de='soporte@proeditsclub.com';
    //obtener el formulario del postulante
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
                 // la secretaria notifca el postulante de que la ifnormacion validad no es la correcata
                 if($request['estado']==0 ){
                    $plantillaCorreo=$this->templateCorreoValidacionNoExitosa( $usuarioEstudiante['nombre'],
                                                                   $usuarioEstudiante['apellido'],
                                                                   $request['estado']);
                    $enviarCorreoBolean=$this->enviarCorreo( $plantillaCorreo,$usuarioEstudiante['correo'],$this->de,"Proceso de registro de Postulante");

                   //notificar a la secretaria sobre el nuevo registro //o reenvio de infomracion

                    $texto="[".date("Y-m-d H:i:s")."]" ." Registro Postulante informacion no validada Correo por parte de la secrataria : ".$enviarCorreoBolean." ]";
                    fwrite($handle, $texto);
                    fwrite($handle, "\r\n\n\n\n");
                    fclose($handle);
                }
     
                 // si la potulacion es aprobada exitosamente se notifica al encargado y al postulante
                 if($request['estado']==1){// validacion exitosa
                    //ENVIAMOS LOS CORREOS TANTO AL ENCARGADO Y AL POSTULANTE

                    //1.ENVIAMO AL POSUTLOANTE LA APROBACION
                    $plantillaCorreo=$this->templateCorreoValidacionNoExitosa( $usuarioEstudiante['nombre'],
                    $usuarioEstudiante['apellido'], 1);
                    $enviarCorreoBolean=$this->enviarCorreo( $plantillaCorreo,$usuarioEstudiante['correo'],$this->de,"Proceso de registro de Postulante");
                    //2. ENVIAMOS EL CORREO AL ENCARGADO
                     $usuarioEncargado=Docente::join("usuario","usuario.id","=","docente.fk_usuario")
                     ->select("docente.*","usuario.*")
                     ->where("docente.estado",1)
                     ->where("usuario.tipoUsuario",5)
                     ->get();
                     //enviamo el correo
                     foreach ($usuarioEncargado as $key => $value) {
                        $plantillaCorreoEncargado= $this->
                        templateCorreoValidacionExitosaEncargado($usuarioEstudiante['nombre'],$usuarioEstudiante['apellido'],$usuarioEstudiante['correo']);
                         $enviarCorreoBoolean=$this->enviarCorreo($plantillaCorreoEncargado,$value['correo'],$this->de,"Nuevo postulante aprobado");
                         $arraycorreoRespuesta[$key]=array("nombre"=>$value['nombre'],
                                                     "apellido"=>$value['apellido'],
                                                     "estadoEnvioCorreo"=>$enviarCorreoBoolean,
                                                     "correo"=>$value['correo'],
                                                     );
                        $texto="[".date("Y-m-d H:i:s")."]" ." Aprobar validacion de formulario de estudiante notficar al estudiante y al encargado Correo  : ".$enviarCorreoBolean." El correo del encargado es : ".$value['correo']."  ]";
                        fwrite($handle, $texto);
                        fwrite($handle, "\r\n\n\n\n");
                        fclose($handle);
                     }
                 }
                 // si la validacion no es exitosa se le comina al estudiante que revise su informaicon
                return response()->json(["mensaje"=>$ObjEstudiante,"Siglas"=>"OE",
                                            "correoEstadoEstudiante"=> $enviarCorreoBolean,
                                            "correoEstadoEncargado"=> $arraycorreoRespuesta,
                                            "respuesta"=>"Operacion Exitosa"]);
                 
             } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede actulizar el postulante","Siglas"=>"ONE","error"=>$th]);
             }

         }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
         }

    }
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
                        ->where("docente.estado",1)
                        ->where("usuario.tipoUsuario",3)
                        ->get();
                        foreach ($usuarioSecrataria as $key => $value) {
                            //tengo q redacatra el menaje a la secretaria
                            $plantillaCorreo=$this->templateCorreoNotificarSecretariaRegistro(
                                                    $request["nombre"],
                                                    $request["apellido"],
                                                    $ObjUsuario['correo']
                                                );

                            $enviarCorreoBolean=$this->enviarCorreo($plantillaCorreo,
                                                                    $value['correo'],
                                                                    $this->de,"Nuevo postulante registrado");
                            $arraycorreoRespuesta[$key]=array("nombre"=>$value['nombre'],
                                                        "apellido"=>$value['apellido'],
                                                        "estadoEnvioCorreo"=>$enviarCorreoBolean,
                                                        "correo"=>$value['correo'],
                                                        );
                            $texto="[".date("Y-m-d H:i:s")."]" ." Reenviando Formulario a la secretaria con los datos corregidos Correo  : ".$enviarCorreoBolean." ]";
                            fwrite($handle, $texto);
                            fwrite($handle, "\r\n\n\n\n");
                            fclose($handle);
                        }
                        
                    return response()->json(["mensaje"=> $ObjEstudiante,
                                                "etadoCorreo"=> $arraycorreoRespuesta,
                                                "Siglas"=>"OE"]);
                    }else{
                       return response()->json(["mensaje"=>"Operacion No Exitosa, no existe registro de formulario del estudiante","Siglas"=>"ONE"]);
                    }
                }else{
                   return response()->json(["mensaje"=>"Operacion No Exitosa no se encontro el usuario external_us","Siglas"=>"ONE"]);
               }
            } catch (\Throwable $th) {
               return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede actulizar el postulante",
                                            "request"=>$request->json()->all(),
                                            "Siglas"=>"ONE","error"=>$th]);
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
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar los estudiante","Siglas"=>"ONE","error"=>$th]);
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

    private function templateCorreoValidacionNoExitosa($nombre,$apellido,$estado){
        if($estado==1){// si el estado es 1, siginifica que el postulante esta validado
            $tipoAlert="alert-success";
            $mensaje="Su información ha salido validado exitosamente ";
        }
        if($estado==0){// si el estado es 0, siginifica que el postulante no esta validado
            $tipoAlert="alert-warning";
            $mensaje="Su  información tiene algunas inconsistencias por favor revise su informacion y vuelva a intentar";
        }
        $emailMensaje='<html>
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <style>
                            /* Add custom classes and styles that you want inlined here */
                        </style>
                        </head>
                        <body class="bg-light">
                        <div class="container">
                            <div class="card my-5">
                            <div class="card-body">
                                <img class="img-fluid" width="100" height="200" src="http://www.proeditsclub.com/Tesis/Archivos/Correo/logo-cis.jpg" alt="Some Image" />
                                <h4 class="fw-bolder text-center">Proceso de registro del Postulante</h4>
                                <hr>
                                <div class="alert '.$tipoAlert.'">
                                    Estimado/a '.$nombre." 
                                    ".$apellido. 
                                    ' Se le informa que : '.$mensaje.'
                                <div>
                            </div>
                            </div>
                            </div>
                        </div>
                        </body>
                    </html>';
        return $emailMensaje;      
    }
    private function templateCorreoValidacionExitosaEncargado($nombre,$apellido,$correoPostulante){

        $emailMensaje='<html>
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <style>
                            /* Add custom classes and styles that you want inlined here */
                        </style>
                        </head>
                        <body class="bg-light">
                        <div class="container">
                            <div class="card my-5">
                            <div class="card-body">
                                <img class="img-fluid" width="100" height="200" src="http://www.proeditsclub.com/Tesis/Archivos/Correo/logo-cis.jpg" alt="Some Image" />
                                <h4 class="fw-bolder text-center">Proceso de registro del Postulante</h4>
                                <br>
                                <hr>
                                <div class="alert alert-success">
                                    El postulante  '.$nombre." ".$apellido. ' ha sido validada su información con éxito
                                    <hr>
                                    Correo del Postulante: '.$correoPostulante.'
                            </div>
                            </div>
                            </div>
                        </div>
                        </body>
                    </html>';
        return $emailMensaje;      
    }
    

    private function enviarCorreo($emailMensaje,$para,$de,$tituloCorreo){
        try {
   
            $mail=new PHPMailer();
            $mail->CharSet='UTF-8';
            $mail->isMail();
            $mail->setFrom($de,'Proceso de Inserccón Laboral');
            $mail->addReplyTo($de,'Proceso de Inserccón Laboral');
            $mail->Subject=($tituloCorreo);
            $mail->addAddress($para);
            $mail->msgHTML($emailMensaje);
            $envio=$mail->Send();
            if ($envio==true) {
            return $respuestaMensaje="true";
            }else{
                return $respuestaMensaje="false";
            }
        } catch (\Throwable $th) {
        return  $respuestaMensaje=$th;
        }
    }

    private function templateCorreoNotificarSecretariaRegistro($nombre,$apellido,$correoPostulante){

        $emailMensaje='<html>
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <style>
                            /* Add custom classes and styles that you want inlined here */
                        </style>
                        </head>
                        <body class="bg-light">
                        <div class="container">
                            <div class="card my-5">
                            <div class="card-body">
                                <img class="img-fluid" width="100" height="200" src="http://www.proeditsclub.com/Tesis/Archivos/Correo/logo-cis.jpg" alt="Some Image" />
                                <h4 class="fw-bolder text-center">Proceso de registro del Postulante</h4>
                                <br>
                                <hr>
                                <div class="alert alert-primary">
                                    Se ha registrado el nuevo postulante
                                    '.$nombre." ".$apellido. ' 

                                    <hr>
                                    Correo del Postulante: '.$correoPostulante.'
                            </div>
                            </div>
                            </div>
                        </div>
                        </body>
                    </html>';
        return $emailMensaje;      
    }
}
