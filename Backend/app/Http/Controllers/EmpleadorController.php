<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Usuario;
use App\Models\Docente;
use App\Models\Empleador;
use PHPMailer\PHPMailer\PHPMailer;
use App\Models\Estudiante;
//permite traer la data del apirest
use Illuminate\Http\Request;
class EmpleadorController extends Controller{   
    private $de='soporte@proeditsclub.com';
    //obtener los datos del formulario del empleador
     public function FormEmpleador(Request $request){
         if($request->json()){
             //validar si el usuario existe
             $ObjUsuario = Usuario::where("external_us",$request['external_us'])->first();
             if($ObjUsuario!=null){
                 $ObjEmpleador = Empleador::where("fk_usuario","=", $ObjUsuario->id)->first();
                 if($ObjEmpleador !=null){
                     return response()->json(["mensaje"=> $ObjEmpleador,"Siglas"=>"OE",200]);
                 }else{
                    return response()->json(["mensaje"=>"Operacion No Exitosa, no existe registro de formulario del empleador","Siglas"=>"ONE"]);
                 }
    
            }else{
                return response()->json(["mensaje"=>"Operacion No Exitosa no se encontro el usuario external_us","Siglas"=>"ONE"]);
            }

         }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
         }
     }
     //aqui aprobamos o no al empleador 
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
                    $plantillaCorreo=$this
                    ->templateCorreoValidacionNoExitosa( $usuarioEmpleador['nom_representante_legal'],
                                                        $usuarioEmpleador['razon_empresa'],
                                                        $request['estado']);
                    
                    $enviarCorreoBolean=$this
                    ->enviarCorreo( $plantillaCorreo,$usuarioEmpleador['correo'],$this
                    ->de,"Proceso de registro de Empleador");

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
                    $plantillaCorreo=$this
                    ->templateCorreoValidacionNoExitosa($usuarioEmpleador['nom_representante_legal'],
                                                            $usuarioEmpleador['razon_empresa'],
                                                          1);
                    $enviarCorreoBolean=$this
                    ->enviarCorreo( $plantillaCorreo,$usuarioEmpleador['correo'],$this
                    ->de,"Proceso de registro de Empleador");
    
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

                                        "respuesta"=>"Operacion Exitosa"]);
             } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"No se puede actulizar el postulante","Siglas"=>"ONE","error"=>$th]);
             }

         }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
         }

    }
    public function actulizarFormEmpleador(Request $request,$external_id){
        //die(json_encode($request->json()->all()));
        if($request->json()){
            $ObjUsuario=null;
            try {
                $ObjUsuario = usuario::where("external_us",$external_id)->first();
                if($ObjUsuario!=null){
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

                        $arrayEncargado=$this->enviarCorreoEncargadoFormEditadoRegistrado($request,$ObjUsuario);
                        return response()->json(["mensaje"=>$ObjEstudiante,
                                                 "estadoCorreoEnviado"=>$arrayEncargado,
                                                    "Siglas"=>"OE"]);
                    }else{
                       return response()->json(["mensaje"=>"Operacion No Exitosa, no existe registro de formulario del empleador","Siglas"=>"ONE"]);
                    }
       
               }else{
                   return response()->json(["mensaje"=>"Operacion No Exitosa no se encontro el usuario external_em","Siglas"=>"ONE"]);
               }
            } catch (\Throwable $th) {
               return response()->json(["mensaje"=>"No se puede actulizar el empleador",
                                        "respuestaObjUsuario"=> $ObjUsuario,
                                        "objEmpelador"=>$request->json()->all(),
                                        "Siglas"=>"ONE","error"=>$th]);
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
            $ObjeEmpleador=Empleador::get();
            return response()->json(["mensaje"=>$ObjeEmpleador,"Siglas"=>"OE","respuesta"=>"Operacion Exitosa"]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar los estudiante","Siglas"=>"ONE","error"=>$th]);
        }

  
    }
    //obtener postulante por url //external_us
    public function obtenerEmpleadorExternal_em(Request $request){
        if($request->json()){
            try {
                $ObjeEmpleador=null;
                $ObjeEmpleador=Empleador::where("external_em","=",$request['external_em'])->first();
                return $this->retornarRespuestaEstudianteEncontrado($ObjeEmpleador);
                 
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa, no se encontro el empleador "+$request['external_es'],"Siglas"=>"ONE","error"=>$th]);
            }

        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }

    private function retornarRespuestaEstudianteEncontrado($ObjetoEstudiante){

        if($ObjetoEstudiante!=null){
            return response()->json(["mensaje"=>$ObjetoEstudiante,"Siglas"=>"OE","respuesta"=>"Operacion  Exitosa"]);
        }else{
            return response()->json(["mensaje"=>$ObjetoEstudiante,"Siglas"=>"ONE","respuesta"=>"Operacion No Exitosa, no se encontro el empleador "]);
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
                $arrayEncargado=$this->enviarCorreoEncargadoFormEditadoRegistrado($datos,$ObjUsuario);
            
                return response()->json(["mensaje"=> "Registro Exitoso","Siglas"=>"OE",
                                            "estadoCorreoEnviado"=>$arrayEncargado,
                                            "respuestaEmpleador"=>$ObjEmpleador,200]);
            } catch (\Throwable $th) {
                //throw $th;
                return response()->json(["mensaje"=>"Error en el servidor",
                "respuestaObjUsuario"=>$ObjUsuario,
                "respuestaObjEmpleador"=>$ObjEmpleador,
                "Siglas"=>"ONE",
                "error"=>$th]);
            }
        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }
    private function templateCorreoNotificarEncargadoRegistro($nombreRepresentanteLegal,$Empresa,$correoEmpleador){

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
                                    Se ha registrado el empleador 
                                    '.$nombreRepresentanteLegal.'
                                    <hr>
                                    Empresa : '.$Empresa.'
                                    <hr>
                                    Correo del Empleador: '.$correoEmpleador.'
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

    private function enviarCorreoEncargadoFormEditadoRegistrado($datos,$ObjUsuario){
            //enviar correo del registro el encargado
            $texto="";
            $handle = fopen("logRegistroEmpleador.txt", "a");
            //enviamos registro de postulante a la secretaria a la secretaria
            $usuarioEncargado=Docente::join("usuario","usuario.id","=","docente.fk_usuario")
            ->select("docente.*","usuario.*")
            ->where("docente.estado",1)
            ->where("usuario.tipoUsuario",5)
            ->get();
            $arrayEncargado=null;
            //recorrer todos los usuario que sean encargado
            foreach ($usuarioEncargado as $key => $value) {
                //tengo q redacatra el menaje a la secretaria
                $plantillaCorreo=$this->templateCorreoNotificarEncargadoRegistro(
                                        $datos["nom_representante_legal"],
                                        $datos["razon_empresa"],
                                        $ObjUsuario->correo
                                    );
                $enviarCorreoBolean=$this->enviarCorreo($plantillaCorreo,
                                                    $value['correo'],
                                                    $this->de,"Nuevo empleador registrado");

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
                fclose($handle);
            }

            return $arrayEncargado;
    }
    private function templateCorreoValidacionNoExitosa($nombreRepresentanteLegal,$nombreEmpresa,$estado){
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
                                <br>
                                <hr>
                                <div class="alert '.$tipoAlert.'">
                                    Estimado/a '.$nombreRepresentanteLegal." representante de la Empresa : ".$nombreEmpresa. ' Se le informa que : '.$mensaje.'
                            </div>
                            </div>
                            </div>
                        </div>
                        </body>
                    </html>';
        return $emailMensaje;      
    }
}
