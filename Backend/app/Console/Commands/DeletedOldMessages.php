<?php

namespace App\Console\Commands;


use Illuminate\Console\Command;
use App\Models\Estudiante;
//use App\Http\Controllers\EstudianteController;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use PHPMailer\PHPMailer\PHPMailer;
require 'PHPMailer/vendor/autoload.php';

class DeletedOldMessages extends Command

{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:eliminarMensaje';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {

        parent::__construct();
       
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        try {

            $rando=rand(5, 100);
             $res=Estudiante::where("external_es","=","Es3aa844a8-f3e6-4bc2-ad1c-9210bd669e32")
                                ->update(array( 'estado'=>$rando));
                             //   die(json_encode($res));
            $handle = fopen("log.txt", "a");
            
         
            $texto="[".date("Y-m-d H:i:s")."]" ." Estado :".$res." Randon : ".$rando ." Correo : ".$respuestaMensaje;
            fwrite($handle, $texto);
            fwrite($handle, "\r\n\n\n\n");
            fclose($handle);
        } catch (\Throwable $th) {
            dd( $th);
        }
  
    }

    private function procesoRegistroPostulanteExpero($usuario){
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
                                <h4 class="fw-bolder text-center">Estado de Validación de información del Postulante </h4>
                                <br>
                                <hr>
                                <div class="alert alert-warning">
                                       Estimado '.$usuario.' Se le informa que la validación de su información ha expirado, porfavor vuelva a insistir ingresando a su cuenta y reenviando el formulario
                            </div>
                            </div>
                            </div>
                        </div>
                        </body>
                    </html>';
        return $this->templateCorreo($emailMensaje);

      
    }

    private function templateCorreo($emailMensaje,$para,$de,$tituloCorreo){
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
    
    // private function procesoRegistroPostulante(){

    // }



}
