<?php

namespace App\Console\Commands;


use Illuminate\Console\Command;
use App\Models\Estudiante;
use App\Models\Empleador;
use Carbon\Carbon;
use PHPMailer\PHPMailer\PHPMailer;

class NotificarUsuarios extends Command

{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    private $tiempoValidarFormEstudiante=48;// horas
    private $tiempoValidarFormEmpleador=72;// horas
    private $de='soporte@proeditsclub.com';
    protected $signature = 'command:notificarUsuarios';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cuando pasa 48 se envia la notifiacion ';

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
        
    // $this->notificarEstudiante();
     $this->notificarEmpleador();
        
    }

    private function notificarEstudiante(){
        $texto="";
        $handle = fopen("log.txt", "a");
        try {
            $usuario=Estudiante::join("usuario","usuario.id","=","estudiante.fk_usuario")
            ->select("estudiante.*","usuario.*")
            ->where("estudiante.estado",0)
            ->where("usuario.tipoUsuario",2)
            ->where("estudiante.observaciones","")
            ->whereDate('estudiante.updated_at',"<",Carbon::now()->subHour($this->tiempoValidarFormEstudiante))
            ->get();

            $TituloCorreo="Proceso de registro del Postulante";
            $observaciones="La validación de su información ha expirado, porfavor vuelva a insistir reenviando el formulario";
            foreach ($usuario as $key => $value) {
                $estudianteBooleand=Estudiante::where("fk_usuario","=",$value['fk_usuario'])
                ->update(array( 'estado'=>0,"observaciones"=>$observaciones));
                $plantillaCorreo=$this->templateCorreoValidacionExpirada($value['nombre'],$value['apellido'],$TituloCorreo);
                $enviarCorreoBolean=$this->enviarCorreo( $plantillaCorreo,$this->de,$value['correo'],$TituloCorreo);
                $texto="[".date("Y-m-d H:i:s")."]" ." Update Estudiante Registro Expirado :".$value['correo']." = ".( $estudianteBooleand ? 'true' : 'false') ." ↑↑ Enviar Correo : ".($enviarCorreoBolean ? 'true' : 'false');
                fwrite($handle, $texto);
                fwrite($handle, "\r\n\n\n\n");
            }
            fclose($handle);
        } catch (\Throwable $th) {
            $texto="[".date("Y-m-d H:i:s")."]" ." Error : ".$th." ]";
            fwrite($handle, $texto);
            fwrite($handle, "\r\n\n\n\n");
            fclose($handle);
        }
    }
    private function notificarEmpleador(){
            $texto="";
            $handle = fopen("log.txt", "a");
            try {

                $usuario=Empleador::join("usuario","usuario.id","=","empleador.fk_usuario")
                ->select("empleador.*","usuario.*")
                ->where("empleador.estado",0)
                ->where("usuario.tipoUsuario",6)
                ->where("empleador.observaciones","")
                ->whereDate('empleador.updated_at',"<",Carbon::now()->subHour($this->tiempoValidarFormEmpleador))
                ->get();

                $TituloCorreo="Proceso de inscripción del empleador";
                $observaciones="La validación de su información ha expirado, porfavor vuelva a insistir reenviando el formulario";
                foreach ($usuario as $key => $value) {
                    $estudianteBooleand=Empleador::where("fk_usuario","=",$value['fk_usuario'])
                    ->update(array( 'estado'=>0,"observaciones"=>$observaciones));
                    $plantillaCorreo=$this->templateCorreoValidacionExpirada($value['razon_empresa'],"",$TituloCorreo);
                    $enviarCorreoBolean=$this->enviarCorreo( $plantillaCorreo,$this->de,$value['correo'],$TituloCorreo);
                    $texto="[".date("Y-m-d H:i:s")."]" ." Update Empleador registro Expirado :".$value['correo']." = ".( $estudianteBooleand ? 'true' : 'false') ." ↑↑ Enviar Correo : ".($enviarCorreoBolean ? 'true' : 'false');
                    fwrite($handle, $texto);
                    fwrite($handle, "\r\n\n\n\n");
                }
                fclose($handle);
            } catch (\Throwable $th) {
                $texto="[".date("Y-m-d H:i:s")."]" ." Error : ".$th." ]";
                fwrite($handle, $texto);
                fwrite($handle, "\r\n\n\n\n");
                fclose($handle);
            }
        }
        private function templateCorreoValidacionExpirada($nombre,$apellido,$HtmlTitulo){
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
                                    <h4 class="fw-bolder text-center">' .$HtmlTitulo. '</h4>
                                    <br>
                                    <hr>
                                    <div class="alert alert-warning">
                                        Estimado/a '.$nombre." ".$apellido. ' Se le informa que la validación de su información ha expirado, porfavor vuelva a insistir ingresando a su cuenta y reenviando el formulario
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
