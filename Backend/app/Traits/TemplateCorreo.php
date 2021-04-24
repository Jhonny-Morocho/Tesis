<?php
namespace App\Traits;
use PHPMailer\PHPMailer\PHPMailer;

trait TemplateCorreo {
    public function templateHtmlCorreo($nombreUsuario,$parrafoMensaje){
       return'
       <html>
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
                    <img width="300"
                        height="100"
                        src="'.getenv("LOGO_UNL").'" alt="UNl" />
                    <div class="h6 text-muted mt-3">Universidad Nacional de Loja</div>
                    <h5 class=" mt-2"><b>CARRERA DE INGENIERÍA EN SISTEMAS (UNL) </b></h5>
                    <hr>
                    <div class="container">
                        <p class=" mt-2">
                            Estimado/a '.$nombreUsuario.'
                        </p>
                        <p class=" mt-2">
                            '.$parrafoMensaje.'
                        </p>
                        <p class=" mt-2">
                            Por favor,revise su perfil en el
                            "Módulo de software para laVinculación Laboral de Actores dela Carrera de Ingeniería enSistemas/Computación"
                        </p>
                </div>
                    <a class="btn btn-primary btn-lg mt-4 "
                            href="'.getenv("DOMINIO_WEB").'" style="background:#292721 !important;">
                    Acceder
                    </a>
                        <p class="mt-3">Saludos Cordiales</p>
                    <hr>
                    <p><b>CARRERA DE INGENIERÍA EN SISTEMAS (UNL)</b></p>
                    <p class="text-secondary">07-2546384/07-2547252(ext 154-155) Ciudad Universitaria "Ing. Guillermo Falconi Espinosa"</p>
                </div>
                </div>
            </div>
            </body>
      </html>';
    }
    private function enviarCorreo($templateHtml,$para,$tituloCorreo){
        try {
            $mail=new PHPMailer();
            $mail->CharSet='UTF-8';
            $mail->isMail();
            $mail->setFrom(getenv("CORREO_MODULO"),'Proceso de Inserccón Laboral');
            $mail->addReplyTo(getenv("CORREO_MODULO"),'Proceso de Inserccón Laboral');
            $mail->Subject=($tituloCorreo);
            $mail->addAddress($para);
            $mail->msgHTML($templateHtml);
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
