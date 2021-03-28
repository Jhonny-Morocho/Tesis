<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Usuario;
use App\Models\Docente;
//usar en php mailer
use PHPMailer\PHPMailer\PHPMailer;
//============
use App\Models\Empleador;
use App\Models\Estudiante;
use Error;
//permite traer la data del apirest
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

require 'Utilidades/PHPMailer/vendor/autoload.php';
class TemplateCorreoController extends Controller
{
   
    
     //Correo
     public function login(Request $request){
        
        if($request->json()){
            $datos=$request->json()->all();
            $usuario=Usuario::where("correo",$datos['correo'])->first();
            // ========= VALIDACION DEL USUARIO ANTES DE INICIAR EL LOGIN ====
            //existe el usuario 
            if($usuario){
                if(password_verify($datos['password'],$usuario['password'])){
                    // preguntamos que tipo de usuario es 
                 try {
                        // $mail=new PHPMailer();
                        // $mail->CharSet='UTF-8';
                        // $mail->isMail();
                        // $mail->setFrom('jmmorochoaunl.edu.ec@gmail.com','Proeditsclub.com');
                        // $mail->addReplyTo('jmmorochoaunl.edu.ec@gmail.com','Proeditsclub.com');
                        // $mail->Subject=('Solicitud de nueva contraseña Proeditsclub.com');
                        // $mail->addAddress('jmmorochoa@unl.edu.ec');
                        // $mail->msgHTML('<div style="width: 100%; height: 30%; position: relative;font-family:sans-serif ; padding-bottom: 40px;">
                        //                     <center>
                                                
                        //                             <img src="http://www.proeditsclub.com/img/logo-red-black.png" alt="" style="padding: 20px;" width="40%" height="20%">
                        //                     </center>
                        //                 </div>
                                    
                        //                 <div style="position: relative; width: 100%; background: white; padding: 20px; ">
                        //                     <center>
                        //                         <img src="http://proeditsclub.com/img/contraseña.png" alt="" width="10%" height="10%">
                        //                         <h3 style="font-weight: 100px; background: whitesmoke;">
                        //                             Su nueva contraseña es : '."========== perrro ============".'
                        //                             <hr style="border: 1px solid #ccc; width: 80%;">
                        //                         </h3>
                        //                         <h4 style="font-weight: 100;color:#999 ; padding: 0 20px;">
                        //                             Acceda con esta contraseña temporal  y despues puede cambiar su contraseña en su panel de administracion.
                        //                         </h4>
                                    
                        //                         <a href="https://proeditsclub.com/login.php" style="color: white; text-decoration: none;" target="_blank">
                                                
                        //                             <div style="line-height: 60px;background: #FD0002; width: 60%; color: white; font-size: 20px;">Ir a Proeditsclub.com
                        //                             </div>
                        //                         </a>
                        //                     </center>
                        //                 </div>');

                        //$envio=$mail->Send();
                        $respuestaCorreo=array();
                        // if ($envio==true) {
                        //     $respuestaCorreo=array('correo'=>'Si se envio correoEnviado');
      
                        // }else{

                        //     $respuestaCorreo=array('correo'=>'No se enviio el correo');
                        // }
                        return response()->json(["mensaje"=>$usuario,"correoRespuesta"=>$respuestaCorreo,
                                                    "Siglas"=>"OE",200]);

                    } catch (\Throwable $th) {
                        //throw $th;
                        return response()->json(["mensaje"=>"El tipo de usuario no encontrado","Siglas"=>"TUNE",400,"request"=>$th]);
                    }
                }else{
                    return response()->json(["mensaje"=>"Password Incorrecto","Siglas"=>"PI",400]);
                }

            }
            // usuario no encontrado
            else{
                return response()->json(["mensaje"=>"El usuario no existe","Siglas"=>"UNE",400]);
            }

        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
     }

  

}
