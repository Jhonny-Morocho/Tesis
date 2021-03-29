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
    private $de='soporte@proeditsclub.com';
    //formulario de estudiante comparando el external_us y externarl_es//creamos un estudiante
     public function FormEstudiante(Request $request){
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
     //actulizar dato de postulante//estudainte
     public function actulizarAprobacionEstudiante(Request $request,$external_id){
         if($request->json()){
             try {
                 $ObjEstudiante = Estudiante::where("external_es","=",$external_id)->update(array( 'estado'=>$request['estado'], 'observaciones'=>$request['observaciones']));
                 //notificar al correo sobre la aprobacion y no aprobacion
                 $usuarioEstudiante=Estudiante::join("usuario","usuario.id","=","estudiante.fk_usuario")
                 ->select("estudiante.*","usuario.*")
                 ->where("usuario.tipoUsuario",2)
                 ->where("external_es",$external_id)
                 ->first();
                 //se envia al postulante
                 $plantillaCorreo=$this->templateCorreoValidacionNoExitosa( $usuarioEstudiante['nombre'],
                                                                $usuarioEstudiante['apellido'],
                                                                $request['estado']);
                 $enviarCorreoBolean=$this->enviarCorreo( $plantillaCorreo,$usuarioEstudiante['correo'],$this->de,"Proceso de registro de Postulante");
                
                
                 //se envia el correo al encargado
                $usuarioEncargado=Docente::join("usuario","usuario.id","=","docente.fk_usuario")
                ->select("docente.*","usuario.*")
                ->where("docente.estado",1)
                ->where("usuario.tipoUsuario",5)
                ->get();
                $arrayEncagado=array();
                foreach ($usuarioEncargado as $key => $value) {
                   $enviarCorreoEncargado= $this->
                   templateCorreoValidacionExitosaEncargado($value['nombre'],$value['apellido'],$usuarioEstudiante['correo']);
                    $enviarCorreoBoolean=$this->enviarCorreo($enviarCorreoEncargado,$usuarioEstudiante['correo'],$this->de,"Nuevo postulante registrado");
                    $arrayEncagado[$key]=array("nombre"=>$value['nombre'],
                                                "apellido"=>$value['apellido'],
                                                "estadoEnvioCorreo"=>$enviarCorreoBoolean,
                                                "correo"=>$value['correo'],
                                                );
                }
                return response()->json(["mensaje"=>$ObjEstudiante,"Siglas"=>"OE",
                                            "correoEstadoEstudiante"=> $enviarCorreoBolean,
                                            "correoEstadoEncargado"=> $arrayEncagado,
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
            try {

                $ObjUsuario = usuario::where("external_us",$external_id)->first();
                if($ObjUsuario!=null){
                    $ObjEstudiante = 
                        estudiante::where("fk_usuario","=", $ObjUsuario->id)->update(
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
                        return response()->json(["mensaje"=> $ObjEstudiante,"Siglas"=>"OE"]);
                    }else{
                       return response()->json(["mensaje"=>"Operacion No Exitosa, no existe registro de formulario del estudiante","Siglas"=>"ONE"]);
                    }
       
               }else{
                   return response()->json(["mensaje"=>"Operacion No Exitosa no se encontro el usuario external_us","Siglas"=>"ONE"]);
               }

             
                
            } catch (\Throwable $th) {
               return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede actulizar el postulante","Siglas"=>"ONE","error"=>$th]);
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
            $ObjeEstudiante=Estudiante::get();
            return response()->json(["mensaje"=>$ObjeEstudiante,"Siglas"=>"OE","respuesta"=>"Operacion Exitosa"]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar los estudiante","Siglas"=>"ONE","error"=>$th]);
        }

    }
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
            $mensaje="Su formulario de información ha salido validado exitosamente";
        }
        if($estado==0){// si el estado es 0, siginifica que el postulante no esta validado
            $tipoAlert="alert-warning";
            $mensaje="Su formulario de información tiene algunas inconsistencias por favor revise su informacion y vuelva a intentar";
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
                                <br>
                                <hr>
                                <div class="alert '.$tipoAlert.'">
                                    Estimado/a '.$nombre." ".$apellido. ' Se le informa que : '.$mensaje.'
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
                                    El postulante  '.$nombre." ".$apellido. ' ha sido validad su informacin con éxito
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
}
