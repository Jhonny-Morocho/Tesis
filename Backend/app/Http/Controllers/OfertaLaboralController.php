<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar

use App\Models\Empleador;
use App\Models\OfertasLaborales;
use App\Models\Usuario;
use App\Models\Docente;
use App\Models\Estudiante;
use PHPMailer\PHPMailer\PHPMailer;
use Error;
//permite traer la data del apirest
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

use function PHPUnit\Framework\isEmpty;

class OfertaLaboralController extends Controller
{
  
   //correo de le empresa
   private $de='soporte@proeditsclub.com';
    //registrar oferta laboral
    public function RegistrarOfertaLaboral(Request $request,$external_id){
        
        if($request->json()){
            //obtengo todos los datos y lo guardo en la variable datos
            $datos=$request->json()->all();
            //buscar si existe el usuario que realiza la peticion
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            //pregunto si el extern_us es del usuario que realiza la peticion el empleador
            $ObjEmpleador=Empleador::where("fk_usuario","=",$ObjUsuario->id)->first();
            //creamos un objeto de tipo ofertaLaborales para enviar los datos
            $ObjOfertasLaborales=null;
            try {
                $ObjOfertasLaborales=new OfertasLaborales();
                $ObjOfertasLaborales->fk_empleador=$ObjEmpleador->id;
                $ObjOfertasLaborales->puesto=$datos["puesto"];
                $ObjOfertasLaborales->descripcion=$datos["descripcion"];
                $ObjOfertasLaborales->lugar=$datos["lugar"];
                $ObjOfertasLaborales->obervaciones=$datos["obervaciones"];
                $ObjOfertasLaborales->requisitos=$datos["requisitos"];
                $ObjOfertasLaborales->estado=$datos["estado"];
                $ObjOfertasLaborales->external_of="Of".Utilidades\UUID::v4();
                $ObjOfertasLaborales->save();
                $datosPlantillaCorreo=array(
                    "nombreOfertaLaboral"=>$datos["puesto"],
                    "nombreEmpresa"=>$ObjEmpleador->razon_empresa,
                    "correoUsuarioEmpleador"=>$ObjUsuario->correo
                );
              
                $arrayEncargado=$this->enviarCorreoEncargadoOfertaRegistrado($datosPlantillaCorreo,$ObjUsuario);
                return response()->json(["mensaje"=>"Registro guardado",
                                            "Siglas"=>"OE",
                                            "estadoCorreoEnviado"=>$arrayEncargado,
                                            "Objeto"=>$ObjOfertasLaborales,200,]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa","Siglas"=>"ONE","reques"=>$request->json()->all(),"error"=>$th]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF","reques"=>$request->json()->all(),400]);
        }
 
    }
    // Listar todos las ofertas laborales del empleador 
    public function listarOfertasLaboralesExternal_us( $external_id){
        //obtener todos los usuarios que sean postulante
        $ObjOfertaLaboral=null;
        try {
            //buscar si existe el usuario que realiza la peticion
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            //busco si ese usuario es un estudiante 
            $ObjEmpleador=Empleador::where("fk_usuario","=",$ObjUsuario->id)->first();
            //4 estado //0== eliminado,1==activo,2==aprobado,3==rechazado
            $ObjOfertaLaboral=OfertasLaborales::join("empleador","empleador.id","=","oferta_laboral.fk_empleador")
            ->select("empleador.razon_empresa",
                        "empleador.nom_representante_legal",
                        "empleador.razon_empresa",
                        "empleador.tipo_empresa",
                        "oferta_laboral.*",
                    )
            ->where("oferta_laboral.fk_empleador","=",$ObjEmpleador->id)
            ->where("oferta_laboral.estado","!=","0")
            ->orderBy('oferta_laboral.id', 'DESC')->get();
            return response()->json(["mensaje"=>$ObjOfertaLaboral,"Siglas"=>"OE","fechaCreacion"=>($ObjEmpleador->updated_at)->format('Y-m-d'),200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=> $ObjOfertaLaboral,"Siglas"=>"ONE","error"=>$th,400]);
        }
    }
    // Listar todos los titulos estado cero y no cero//con sus datos de formulario
    public function listarTodasLasOfertasLaborales(){
        //obtener todos los usuarios que sean postulante
        $ObjOfertasLaborales=null;
        try {
            $ObjOfertasLaborales=
            OfertasLaborales::join("empleador","empleador.id","=","oferta_laboral.fk_empleador")
            ->join("usuario","usuario.id","=","empleador.fk_usuario")
            ->select("empleador.razon_empresa",
                        "usuario.correo",
                        "empleador.nom_representante_legal",
                        "empleador.razon_empresa",
                        "empleador.tipo_empresa",
                        "oferta_laboral.*"
                    )
            ->where("oferta_laboral.estado",">=",1)
            ->where("oferta_laboral.estado","<=",4)
            ->get();
            return response()->json(["mensaje"=>$ObjOfertasLaborales,
                                        "Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$ObjOfertasLaborales,
                                    "Siglas"=>"ONE",
                                    "error"=>$th->getMessage(),
                                    400]);
        }
    }
 

    // Listar todos los titulos estado cero y no cero//con sus datos de formulario
    public function listarOfertasLaboralesValidadasEncargado(){
        //obtener todos los usuarios que sean postulante
        try {
            //obtenemos las que ya estan aprobado usario ==2 y las que se tienen que publicar ==3
            $ObjOfertasLaborales=OfertasLaborales::where("estado", ">=", 2)->where("estado", "<=", 3)->get();
            return response()->json(["mensaje"=>$ObjOfertasLaborales,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar las ofertas laborales","Siglas"=>"ONE","error"=>$th,400]);
        }
    }
    // Listar todos los titulos estado cero y no cero//con sus datos de formulario
    public function listarOfertasLaboralesValidadasGestor(){
        //obtener todos los usuarios que sean postulante
        $ObjOfertasLaborales=null;
        try {
            $ObjOfertasLaborales=OfertasLaborales::join("empleador","empleador.id","=","oferta_laboral.fk_empleador")
            ->where("oferta_laboral.estado",3 )->get();
            return response()->json(["mensaje"=>$ObjOfertasLaborales,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$ObjOfertasLaborales,"Siglas"=>"ONE","error"=>$th,400]);
        }
    }


    //estado 4 finalizara la oferta laboral y se la borra de la plataforma
    public function finalizarOfertaLaboral(Request $request,$external_id){
        if($request->json()){
            $estadoOfertaLaboral=null;
            try {
                //actualizar el estado de la oferta laboral
                $estadoOfertaLaboral=OfertasLaborales::where("external_of","=", $external_id)
                ->update(array('estado'=>$request['estado']));
                //actualizar el estado de los postulantes
                return response()->json(["mensaje"=>"Operacion Exitosa",
                        "ObjetaOfertaLaboral"=>$estadoOfertaLaboral,
                        "external_of"=>$external_id,
                        "resquest"=>$request->json()->all(),
                        "Siglas"=>"OE",200]);
                
             //die($data);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa",
                                            "external_of"=>$external_id,
                                            "resques"=>$request->json()->all(),
                                            "Siglas"=>"ONE",
                                            "error"=>$th->getMessage()]);
            }

        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
    }
    public function actulizarOfertaLaboral(Request $request,$external_id){
        if($request->json()){
            $ObjOfertaLaboral=null;
            $estadoCorreoEnviado=null;
            try {
                $ObjOfertaLaboral=OfertasLaborales::where("external_of","=", $external_id)
                ->update(
                        array(
                                'puesto'=>$request['puesto'], 
                                'descripcion'=>$request['descripcion'],
                                'estado'=>$request['estado'],
                                'lugar'=>$request['lugar'],
                                'obervaciones'=>$request['obervaciones'],
                                'requisitos'=>$request['requisitos']
                            ));
                //buscamos al empleador que se relaciones con la oferta laboral
                $usuarioEmpleador=$this->buscarUsuarioEmpleador($external_id);
                $datos=array(
                    "nombreOfertaLaboral"=>$request['puesto'],
                    "nombreEmpresa"=>$usuarioEmpleador->razon_empresa,
                    "correoUsuarioEmpleador"=>$usuarioEmpleador->correo
                );
                //esta publicada la oferta laboral
                if($request['estado']==3){
                    $estadoCorreoEnviado=$this->notificarPublicacionOfertaLaboral($datos);

                }
                if($request['estado']==2){
                    $estadoCorreoEnviado= $this->enviarCorreoGestorOfertaValidada($datos,$usuarioEmpleador);
         
                }
                //oferta revisada pero no validada tiene q corregir oferta// pór parte del encargado
                if($request['estado']==1 && ($request['obervaciones'])!=""){
                    $estadoCorreoEnviado= $this->enviarCorreoEncargadoEstadoOferta($external_id,0);
                }
                  //reenviar la oferta laboral para que la revisen el encargado de nuevo
                  if($request['estado']==1 && ($request['obervaciones'])==""){
                
                    $estadoCorreoEnviado= $this->enviarCorreoEncargadoOfertaRegistrado($datos,$usuarioEmpleador);
                }
                return response()->json(["mensaje"=>"Operacion Exitosa",
                                        "ObjetoOfertaLaboral"=>$ObjOfertaLaboral,
                                        "resquest"=>$request->json()->all(),
                                        "estadoCorreoEnviado"=>$estadoCorreoEnviado,
                                        "respuesta"=>$ObjOfertaLaboral,
                                        "Siglas"=>"OE",200]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa",
                                            "external_of"=>$external_id,
                                            "resques"=>$request->json()->all(),
                                            "Siglas"=>"ONE","error"=>$th->getMessage()]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
    }

    //obtener oferta-laboral por url //external_ti
    public function obtenerOfertaLaboralExternal_of($external_id ){
        try {
            $ObjOfertaLaboral=null;
            $ObjOfertaLaboral=OfertasLaborales::where("external_of","=",$external_id)->first();
            return $this->retornarOfertaLaboralEncontrado($ObjOfertaLaboral);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se encontro el registro "+$external_id,"Siglas"=>"ONE","error"=>$th]);
        }
    }

    private function retornarOfertaLaboralEncontrado($ObjTitulo){
        if($ObjTitulo!=null){
            return response()->json(["mensaje"=>$ObjTitulo,"Siglas"=>"OE","respuesta"=>"Operacion  Exitosa"]);
        }else{
            return response()->json(["mensaje"=>$ObjTitulo,"Siglas"=>"ONE","respuesta"=>"Operacion No Exitosa, no se encontro el titulo"]);
        }
    }
     //terminar de hacer
     public function eliminarOfertaLaboral(Request $request){
        try {
            //actualizo el texto plano 
            $ObjTituloAcademico=OfertasLaborales::where("external_of","=", $request['external_of'])->update(array('estado'=>$request['estado']));

            return response()->json(["mensaje"=>"Operacion Exitosa",
                                     "Respuesta"=>$ObjTituloAcademico,200]);
        
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa","Siglas"=>"ONE","error"=>$th]);
        }
     
    }

    private function templateCorreoNotificarEncargadoRegistroNuevo($nombreOfertaLaboral,$Empresa,$correoEmpleador){

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
                                <h4 class="fw-bolder text-center">Publicación de oferta laboral</h4>
                                <br>
                                <hr>
                                <div class="alert alert-primary">
                                    Se ha registrado la oferta laboral: 
                                    '.$nombreOfertaLaboral.'
                                    <hr>
                                    Pertenece a la Empresa : '.$Empresa.'
                                    <hr>
                                    Correo del usuario Empleador: '.$correoEmpleador.'
                            </div>
                            </div>
                            </div>
                        </div>
                        </body>
                    </html>';
        return $emailMensaje;      
    }
    private function templateCorreoNotificarGestorOfertaValidada($nombreOfertaLaboral,$Empresa,$correoEmpleador){

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
                                <img class="img-fluid" width="500" height="500" src="http://www.proeditsclub.com/Tesis/Archivos/Correo/logo-cis.jpg" alt="Some Image" />
                                <h4 class="fw-bolder text-center">Publicación de oferta laboral</h4>
                                <br>
                                <hr>
                                <div class="alert alert-primary">
                                    Se ha validado la oferta laboral : 
                                    '.$nombreOfertaLaboral.', debe aprobar la publicación de la oferta laboral
                                    <hr>
                                    Pertenece a la Empresa : '.$Empresa.'
                                    <hr>
                                    Correo del usuario Empleador: '.$correoEmpleador.'
                            </div>
                            </div>
                            </div>
                        </div>
                        </body>
                    </html>';
        return $emailMensaje;      
    }

    private function buscarUsuarioEmpleador($external_oferta){
       return  Empleador::join("usuario","usuario.id","=","empleador.fk_usuario")
            ->join("oferta_laboral","oferta_laboral.fk_empleador","empleador.id")
            ->where("empleador.estado",1)
            ->where("oferta_laboral.external_of",$external_oferta)
            ->where("usuario.tipoUsuario",6)
            ->first();
    }
    private function enviarCorreoGestorOfertaValidada($datos,$ObjUsuario){
        //enviar correo del registro el encargado
        $texto="";
        $handle = fopen("logRegistroOfertaLaboral.txt", "a");
        $plantillaCorreo=null;
        $enviarCorreoBolean=null;
        $arrayGestor=array();
        try {
            //enviamos registro de postulante al encargado a la secretaria
            $usuarioGestor=Docente::join("usuario","usuario.id","=","docente.fk_usuario")
            ->select("docente.*","usuario.correo")
            ->where("docente.estado",1)
            ->where("usuario.tipoUsuario",4)
            ->get();
            //recorrer todos los usuario que sean encargado
            foreach ($usuarioGestor as $key => $value) {
                //tengo q redacatra el menaje a la secretaria
                $plantillaCorreo=$this->templateCorreoNotificarGestorOfertaValidada(
                                $datos["nombreOfertaLaboral"],
                                $datos["nombreEmpresa"],
                                $datos["correoUsuarioEmpleador"],
                                );
                $enviarCorreoBolean=$this->enviarCorreo($plantillaCorreo,
                                                    $value['correo'],
                                                    $this->de,
                "Nueva oferta laboral pendiente de publicar");
    
                $arrayGestor[$key]=array("nombre"=>$value['nombre'],
                                            "apellido"=>$value['apellido'],
                                            "estadoEnvioCorreo"=>$enviarCorreoBolean,
                                            "correo"=>$value['correo'],
                                            );
                $texto="[".date("Y-m-d H:i:s")."]"
                ." Oferta laboral validada por el encargado pendiente de publicar por parte del gestor:: Estado del correo enviado al gestor : "
                .$enviarCorreoBolean
                ."::: El Correo del gestor  es: ".$value['correo']
                ."::: El Correo del empleador es :"
                .$ObjUsuario->correo." ]";
                fwrite($handle, $texto);
                fwrite($handle, "\r\n\n\n\n");
            }
            fclose($handle);
            return $arrayGestor;
        } catch (\Throwable $th) {
            $texto="[".date("Y-m-d H:i:s")."]"
            ." Oferta laboral validada por el encargado pendiente de publicar por parte del gestor ERROR ".$th." ]";
            fwrite($handle, $texto);
            fwrite($handle, "\r\n\n\n\n");
            fclose($handle);
            return $arrayGestor=array("error"=>$th);
        }
   
    }
    private function enviarCorreoEncargadoOfertaRegistrado($datos,$ObjUsuario){
        //enviar correo del registro el encargado
        $texto="";
        $handle = fopen("logRegistroOfertaLaboral.txt", "a");
        //enviamos registro de postulante al encargado a la secretaria
        $usuarioEncargado=Docente::join("usuario","usuario.id","=","docente.fk_usuario")
        ->select("docente.*","usuario.*")
        ->where("docente.estado",1)
        ->where("usuario.tipoUsuario",5)
        ->get();
        $arrayEncargado=null;
        $plantillaCorreo=null;
        $enviarCorreoBolean=null;
        //recorrer todos los usuario que sean encargado
        foreach ($usuarioEncargado as $key => $value) {
            //tengo q redacatra el menaje a la secretaria
            $plantillaCorreo=$this
                            ->templateCorreoNotificarEncargadoRegistroNuevo(
                            $datos["nombreOfertaLaboral"],
                            $datos["nombreEmpresa"],
                            $datos["correoUsuarioEmpleador"],
                            );
            $enviarCorreoBolean=$this->enviarCorreo($plantillaCorreo,
                                                $value['correo'],
                                                $this->de,"Nueva oferta laboral registrada");

            $arrayEncargado[$key]=array("nombre"=>$value['nombre'],
                                        "apellido"=>$value['apellido'],
                                        "estadoEnvioCorreo"=>$enviarCorreoBolean,
                                        "correo"=>$value['correo'],
                                        );
            $texto="[".date("Y-m-d H:i:s")."]"
            ." Registrar oferta laboral :: Estado del correo enviado al empleador : "
            .$enviarCorreoBolean
            ."::: El Correo del encargado  es: ".$value['correo']
            ."::: El Correo del empleador es :"
            .$ObjUsuario->correo." ]";
            fwrite($handle, $texto);
            fwrite($handle, "\r\n\n\n\n");
        }
        fclose($handle);
        return $arrayEncargado;
    }
    private function enviarCorreoEncargadoEstadoOferta($external_oferta,$estadoValidacion){
        //enviar correo del registro el empleador
        $texto="";
        $handle = fopen("logRegistroOfertaLaboral.txt", "a");
        $arrayEmpleador=null;
        try {
            //enviamos el estado de la oferta al empleador
            $usuarioEmpleador=$this->buscarUsuarioEmpleador($external_oferta);
            $tituloMensaje="Estado de validación de la oferta laboral ".$usuarioEmpleador->puesto;
            $plantillaCorreo=$this->templateCorreoValidacionEstado(
                            $usuarioEmpleador->nom_representante_legal,
                            $usuarioEmpleador->razon_empresa,
                            $tituloMensaje,
                            $usuarioEmpleador->puesto,
                            $estadoValidacion
                            );

            $enviarCorreoBolean=$this->enviarCorreo($plantillaCorreo,
                                                    $usuarioEmpleador['correo'],
                                                    $this->de,
                                                    $tituloMensaje
                                                );
            $texto="[".date("Y-m-d H:i:s")."]"
            ." Estado de validación de oferta laboral : ".$estadoValidacion."
            :: Estado del correo enviado al empleador : "
            .$enviarCorreoBolean
            ."::: El Correo enviado al empleador es : ".$usuarioEmpleador['correo']."]";
            fwrite($handle, $texto);
            fwrite($handle, "\r\n\n\n\n");
            fclose($handle);
            //recorrer todos los usuario que sean encargado
            $arrayEmpleador=array("razon_empresa"=>$usuarioEmpleador['razon_empresa'],
                                "nom_representante_legal"=>$usuarioEmpleador['nom_representante_legal'],
                                "estadoEnvioCorreo"=>$enviarCorreoBolean,
                                "correoEmpleador"=>$usuarioEmpleador['correo'],
                                );
            return $arrayEmpleador;
            //code...
        } catch (\Throwable $th) {
            $texto="[".date("Y-m-d H:i:s")."]"
            ." Estado de validación de oferta laboral : ".$th."]";
            fwrite($handle, $th);
            fwrite($handle, "\r\n\n\n\n");
            fclose($handle);
            return  $th;
        }
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
    //templateCorreoValidacionNoExitosa($nombre,$apellido,$estado)
    private function templateCorreoValidacionEstado($representante,$nombreEmpresa,
                                                    $HtmlTitulo,$nombreOfertaLaboral,$estadoValidacion){
        if($estadoValidacion==1){// si el estado es 1, siginifica que el postulante esta validado
            $tipoAlert="alert-success";
            $mensaje="ha salido validada exitosamente ";
        }
        if($estadoValidacion==0){// si el estado es 0, siginifica que el postulante no esta validado
            $tipoAlert="alert-warning";
            $mensaje="tiene algunas inconsistencias por favor revise su información y vuelva a intentar";
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
                                <img class="img-fluid" width="500" height="500" src="http://www.proeditsclub.com/Tesis/Archivos/Correo/logo-cis.jpg" alt="Some Image" />
                                <h4 class="fw-bolder text-center">' .$HtmlTitulo. '</h4>
                                <br>
                                <hr>
                                <div class="alert '.$tipoAlert.'">
                                    Estimado/a: '.$representante."  Representante de le empresa: ".$nombreEmpresa. '
                                    <hr>
                                 Se le informa que su oferta laboral denominada : '.$nombreOfertaLaboral.' ,  '.$mensaje.'
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                        </body>
                    </html>';
        return $emailMensaje;      
    }
    //se notifica la aprobacion de la oferta laboral por parte del getor a los estudiante y empleadores
    //corresponde al proceso 4
    private function notificarPublicacionOfertaLaboral($datosOFertaLaboral){
        $texto="";
        $handle = fopen("logRegistroOfertaLaboral.txt", "a");
        $arrayCorreoEstudiantes=array();
        try {
            // notificar al empleador que su oferta laboral esta publicada en la plataforma
            $tituloOfertaLaboralEmpleador="Oferta laboral ".$datosOFertaLaboral['nombreOfertaLaboral']." esta aprobada y publicada";
             $templateCorreoEmpleador=$this->templateCorreoNotificarEmpleadorOfertaPublicada($datosOFertaLaboral['nombreEmpresa'],
                                                                        $tituloOfertaLaboralEmpleador,
                                                                        $datosOFertaLaboral['nombreOfertaLaboral']);
            
            $enviarCorreoBoleanEmpleador=$this->enviarCorreo($templateCorreoEmpleador,
                                                                $datosOFertaLaboral['correoUsuarioEmpleador'],
                                                            $this->de,$tituloOfertaLaboralEmpleador);
    
            // nnotificar de la nueva oferta laboral publicada a todos los postulante que esten inscrito en la pagina
            $usuarioEstudiante=Estudiante::join("usuario","usuario.id","estudiante.fk_usuario")
            ->select("usuario.correo","estudiante.*")
            ->where("estudiante.estado",1)
            ->get();
      
            $tituloOfertaLaboral="Nueva Oferta laboral publicada ";
            foreach ($usuarioEstudiante as $key => $value) {
                $plantillaCorreo= $this->templatenotificarEmpleadorOfertaPublicada($value['nombre'],
                                                                        $value['apellido'],
                                                                        $datosOFertaLaboral['nombreOfertaLaboral'],
                                                                        $tituloOfertaLaboral
                                                                        );
                $enviarCorreoBolean=$this->enviarCorreo($plantillaCorreo,$value['correo'],$this->de,$tituloOfertaLaboral);
                $arrayCorreoEstudiantes[$key]=array(
                    "correoPostulante"=>$value['correo'],
                    "estadoCorreoEnvidaoPostulante"=>$enviarCorreoBolean,
                    "correoEnviadoEmpleador"=>$datosOFertaLaboral['correoUsuarioEmpleador'],
                    "estadoCorreoEnviadoEmpleador"=>$enviarCorreoBoleanEmpleador
                );
    
                $texto="[".date("Y-m-d H:i:s")."]"
                            ." NOTIFICAR PUBLICACIÓN DE OFERTA LABORAL AL EMPLEADOR Y ESTUDIANTES : 
                            ::Estado de enviar correo a los postulantes: ".$enviarCorreoBolean
                            ."::: El Correo del postulante  es: ".$value['correo']." 
                            ::: Estado de correo enviado al empleador : ".$enviarCorreoBoleanEmpleador." 
                            El correo del empleador es : ".$datosOFertaLaboral['correoUsuarioEmpleador']." ] ";
                fwrite($handle, $texto);
                fwrite($handle, "\r\n\n\n\n");
            }
            fclose($handle);
            return $arrayCorreoEstudiantes;
        } catch (\Throwable $th) {
                $texto="[".date("Y-m-d H:i:s")."]"
                ." NOTIFICAR PUBLICACIÓN DE OFERTA LABORAL AL EMPLEADOR Y ESTUDIANTES ERROR: ".$th."  ]";
                fwrite($handle, $texto);
                fwrite($handle, "\r\n\n\n\n");
                fclose($handle);
            return $arrayCorreoEstudiantes=array("error"=>$th->getMessage());
        }
    }

    private function templatenotificarEmpleadorOfertaPublicada($nombrePostulante,$apellidoPostulante,$nombreOfertaLaboral,$tituloOfertaLaboral){

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
                                <img class="img-fluid" width="500" height="500" src="http://www.proeditsclub.com/Tesis/Archivos/Correo/logo-cis.jpg" alt="Some Image" />
                                <h4 class="fw-bolder text-center">'.$tituloOfertaLaboral.' </h4>
                                <hr>
                                    Hola : 
                                    '.$nombrePostulante.' '.$apellidoPostulante.', existe una nueva oferta lobaral publicada
                                    <hr>
                                    Nueva oferta laboral  demominada : <h4 class="fw-bolder">'.$nombreOfertaLaboral.'</h4>
                                    <hr>
                            </div>
                            </div>
                            </div>
                        </div>
                        </body>
                    </html>';
        return $emailMensaje;      
    }

    private function templateCorreoNotificarEmpleadorOfertaPublicada($nombreEmpresa,$tituloMensaje,$nombreOfertaLaboral){

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
                                <img class="img-fluid" width="500" height="500" src="http://www.proeditsclub.com/Tesis/Archivos/Correo/logo-cis.jpg" alt="Some Image" />
                                <h4 class="fw-bolder text-center">' .$tituloMensaje. '</h4>
                                <br>
                                <hr>
                                    Estimado/a usuario :'.$nombreEmpresa.' 
                                    <hr>
                                    Se le informa que su oferta laboral : '.$nombreOfertaLaboral.' ha sido validada y publicada con éxito 
                            </div>
                            </div>
                            </div>
                        </div>
                        </body>
                    </html>';
    return $emailMensaje;      
    }

}
