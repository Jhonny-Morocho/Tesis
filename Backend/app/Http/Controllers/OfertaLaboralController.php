<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar

use App\Models\Empleador;
use App\Models\OfertasLaborales;
use App\Models\Usuario;
use App\Models\Docente;
use PHPMailer\PHPMailer\PHPMailer;
use Error;
//permite traer la data del apirest
use Illuminate\Http\Request;

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
                // $ObjOfertasLaborales=new OfertasLaborales();
                // $ObjOfertasLaborales->fk_empleador=$ObjEmpleador->id;
                // $ObjOfertasLaborales->puesto=$datos["puesto"];
                // $ObjOfertasLaborales->descripcion=$datos["descripcion"];
                // $ObjOfertasLaborales->lugar=$datos["lugar"];
                // $ObjOfertasLaborales->obervaciones=$datos["obervaciones"];
                // $ObjOfertasLaborales->requisitos=$datos["requisitos"];
                // $ObjOfertasLaborales->estado=$datos["estado"];
                // $ObjOfertasLaborales->external_of="Of".Utilidades\UUID::v4();
                // $ObjOfertasLaborales->save();
                die(json_encode( $request->json()->all()));
                $arrayEncargado=$this->enviarCorreoEncargadoFormEditadoRegistrado($request,$ObjUsuario);
                return response()->json(["mensaje"=>"Operacion Exitosa",
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
        try {
            //buscar si existe el usuario que realiza la peticion
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            //busco si ese usuario es un estudiante 
            $ObjEmpleador=Empleador::where("fk_usuario","=",$ObjUsuario->id)->first();
            //4 estado //0== eliminado,1==activo,2==aprobado,3==rechazado
            $ObjOfertaLaboral=OfertasLaborales::where("fk_empleador","=",$ObjEmpleador->id)->where("estado","!=","0")->orderBy('id', 'DESC')->get();
            return response()->json(["mensaje"=>$ObjOfertaLaboral,"Siglas"=>"OE","fechaCreacion"=>($ObjEmpleador->updated_at)->format('Y-m-d'),200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar la oferta","Siglas"=>"ONE","error"=>$th,400]);
        }
    }
    // Listar todos los titulos estado cero y no cero//con sus datos de formulario
    public function listarTodasLasOfertasLaborales(){
        //obtener todos los usuarios que sean postulante
        try {
            $ObjOfertasLaborales=OfertasLaborales::join("empleador","empleador.id","=","oferta_laboral.fk_empleador")
            ->join("usuario","usuario.id","=","empleador.fk_usuario")
            ->where("oferta_laboral.estado",">=",1)
            ->where("oferta_laboral.estado","<=",3)
            ->get();
            return response()->json(["mensaje"=>$ObjOfertasLaborales,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operacion No Exitosa, no se puede listar las ofertas laborales","Siglas"=>"ONE","error"=>$th,400]);
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
    public function actulizarOfertaLaboral(Request $request,$external_id){
        if($request->json()){

            try {           
                $ObjOfertaLaboral=OfertasLaborales::where("external_of","=", $external_id)->update(
                    array(
                        'puesto'=>$request['puesto'], 
                        'descripcion'=>$request['descripcion'],
                        'estado'=>$request['estado'],
                        'lugar'=>$request['lugar'],
                        'obervaciones'=>$request['obervaciones'],
                        'requisitos'=>$request['requisitos']
                    ));
                
                return response()->json(["mensaje"=>"Operacion Exitosa","Objeto"=>$ObjOfertaLaboral,"resques"=>$request->json()->all(),"respuesta"=>$ObjOfertaLaboral,"Siglas"=>"OE",200]);
                //respuesta exitoso o no en la inserrccion
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa","resques"=>$request->json()->all(),"Siglas"=>"ONE","error"=>$th]);
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

    private function templateCorreoNotificarEncargadoRegistro($nombreOfertaLaboral,$Empresa,$correoEmpleador){

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
                                    Se ha registrado la oferta laboral 
                                    '.$nombreOfertaLaboral.'
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
    private function enviarCorreoEncargadoFormEditadoRegistrado($datos,$ObjUsuario){
        //enviar correo del registro el encargado
        $texto="";
        $handle = fopen("logRegistroOfertaLaboral.txt", "a");
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
