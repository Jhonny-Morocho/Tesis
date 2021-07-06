<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Usuario;
use App\Models\Docente;
use App\Models\Estudiante;
//permite traer la data del apirest
use Illuminate\Http\Request;
//template para correo
use App\Traits\TemplateCorreo;

class UsuarioController extends Controller
{
    //Registrar Usuario
    //correo de le emplesa
    use TemplateCorreo;

    public function RegistrarUsuario(Request $request){
        //code...
        if($request->json()){
            //obtengo todos los datos y lo guardo en la variable datos
            $datos=$request->json()->all();
            //creamos un objeto de tipo usuario para enviar los datos
            try {
                // ========= VALIDACION DEL USUARIO ANTES DE INICIAR EL LOGIN ====
                //existe el usuario
                $ObjUsuario=new Usuario();
                $ObjUsuario->correo=$datos["correo"];
                $usuario=Usuario::where("correo",$datos['correo'])
                ->first();
                if($usuario){
                    return response()->json(["mensaje"=>"Ya existe un usuario con el mismo correo","Siglas"=>"ONE",400]);
                }
                //Encriptar Password
                $opciones=array('cost'=>12);
                $passwordCliente=$datos["password"];
                $password_hashed=password_hash($passwordCliente,PASSWORD_BCRYPT,$opciones);
                $ObjUsuario->password=$password_hashed;
                $ObjUsuario->tipoUsuario=$datos["tipoUsuario"];
                $ObjUsuario->estado=$datos["estado"];
                $ObjUsuario->external_us="UuA".Utilidades\UUID::v4();
                $ObjUsuario->save();
                //respuesta exitoso o no en la inserrccion
                return response()->json(["mensaje"=>$ObjUsuario,"Siglas"=>"OE",200,]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th->getMessage()]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }

    }
    public function actualizarPassword(Request $request){

        if($request->json()){
            $ObjUsuario=nuLL;
            $correo=null;
            try {
                //consultar si existe ese usuario
                $datos=$request->json()->all();
                //verificar si existe el usuario
                if (filter_var($datos['correo'], FILTER_VALIDATE_EMAIL)) {
                    $correo=Usuario::where("correo",$datos['correo'])->first();
                }
                if($correo){

                   //actualizar el nuevo password
                   $opciones=array('cost'=>12);
                   $password_hashed=password_hash($datos['password'],PASSWORD_BCRYPT,$opciones);
                   $updatePasword=Usuario::where("correo",$datos['correo'])
                   ->update(array(
                       "password"=>$password_hashed
                    ));
                    return response()->json(["mensaje"=>"Contraseña actualizada con éxito",
                                                "correoUsuario"=>$datos['correo'],
                                                "contraseñaActualizada"=>$updatePasword,
                                                "Siglas"=>"OE",200]);
                }else{
                    return response()->json(["mensaje"=>"Usuario no encontrado",
                                            "Siglas"=>"ONE",400]);
                }

            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$ObjUsuario,
                                            "error"=>$th->getMessage(),
                                            "Siglas"=>"DNF",400]);
            }

        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }
    public function recuperarPassword(Request $request){

        if($request->json()){
            $ObjUsuario=nuLL;
            $correo=null;
            try {
                //consultar si existe ese usuario
                $datos=$request->json()->all();
                //verificar si existe el usuario
                if (filter_var($datos['correo'], FILTER_VALIDATE_EMAIL)) {
                    $correo=Usuario::where("correo",$datos['correo'])->first();
                }
                if($correo){
                    //generamos el nuevo password
                   $nuevoPassword="";
                   $patron="1234567890abcdefghijklmnopqrstuvwxyz";
                   $max=strlen($patron)-1;
                   for ($i=0; $i < 10; $i++) {
                       # code...
                       $nuevoPassword.=$patron[mt_rand(0,$max)];
                   }
                   //actualizar el nuevo password
                   $opciones=array('cost'=>12);
                   $password_hashed=password_hash($nuevoPassword,PASSWORD_BCRYPT,$opciones);
                   $updatePasword=Usuario::where("correo",$datos['correo'])
                   ->update(array(
                       "password"=>$password_hashed
                   ));
                   //enviamos al correo el password
                   $parrafo="Su nueva contraseña es: <b>".$nuevoPassword."</b>";
                   $templateHtmlCorreo= $this->templateHtmlCorreo($datos['correo'],$parrafo);
                   $enviarCorreoBolean=
                        $this->enviarCorreo($templateHtmlCorreo,$datos['correo'],
                                            getenv("TITULO_RECUPERAR_PASSWORD")
                                            );
                    $texto="";
                    $handle = fopen("logRegistroPostulante.txt", "a");
                    $texto="[".date("Y-m-d H:i:s")."]" ." Recuperar contraseña al usuario :
                            ".$datos['correo'].":: estado de enviar correo: ".$enviarCorreoBolean." ]";
                    fwrite($handle, $texto);
                    fwrite($handle, "\r\n\n\n\n");
                    fclose($handle);
                    return response()->json(["mensaje"=>"Contraseña actualizada con éxito",
                                                "correoUsuario"=>$datos['correo'],
                                                "Siglas"=>"OE",200]);
                }else{
                    return response()->json(["mensaje"=>"Usuario no encontrado",
                                            "Siglas"=>"ONE",400]);
                }

            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$ObjUsuario,
                                            "error"=>$th->getMessage(),
                                            "Siglas"=>"DNF",400]);
            }

        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }

    }
    public function RegistrarEstudiante(Request $request,$external_id){
        $handle = fopen("logRegistroPostulante.txt", "a");
        if($request->json()){
            $datos=$request->json()->all();
            $ObjUsuario=Usuario::where("external_us",$external_id)
            ->where("tipoUsuario",2)
            ->first();
            //verificar si el external user es igual
            if($ObjUsuario['external_us']===$external_id){
                //creacion de  un objeto para guardar el estudiante
                $texto="";

                $ObjEstudiante=null;
                try {
                    //code...
                    $ObjEstudiante=new Estudiante();
                    $ObjEstudiante->fk_usuario=$ObjUsuario->id;
                    $ObjEstudiante->nombre=$datos["nombre"];
                    $ObjEstudiante->apellido=$datos["apellido"];
                    $ObjEstudiante->cedula=$datos["cedula"];
                    $ObjEstudiante->telefono=$datos["telefono"];
                    $ObjEstudiante->genero=$datos["genero"];
                    $ObjEstudiante->fecha_nacimiento=$datos["fecha_nacimiento"];
                    $ObjEstudiante->direccion_domicilio=$datos["direccion_domicilio"];
                    $ObjEstudiante->observaciones=$datos["observaciones"];
                    $ObjEstudiante->external_es="Es".Utilidades\UUID::v4();
                    $ObjEstudiante->estado=$datos["estado"];
                    $ObjEstudiante->save();

                    //enviamos registro de postulante a la secretaria a la secretaria
                    $usuarioSecrataria=Docente::join("usuario","usuario.id","=","docente.fk_usuario")
                    ->select("docente.*","usuario.*")
                    ->where("usuario.estado",1)
                    ->where("usuario.tipoUsuario",3)
                    ->get();

                    //recorremo todoss los usuario que sean secretaria
                    $arrayEncargado=null;
                    $parrafo="Se ha registrado el nuevo postulante ".$datos["nombre"]." ".$datos["apellido"].". Con correo: ". $ObjUsuario->correo;
                    foreach ($usuarioSecrataria as $key => $value) {
                        //tengo q redacatra el menaje a la secretaria
                        $plantillaCorreo=$this->templateHtmlCorreo(
                                                $value["nombre"]." ".$value["apellido"],
                                                $parrafo
                                            );

                        $enviarCorreoBolean=
                                $this->enviarCorreo(
                                    $plantillaCorreo,
                                    $value['correo'],
                                    getenv("TITULO_CORREO_POSTULANTE")
                                    );
                        $arrayEncargado[$key]=array("nombre"=>$value['nombre'],
                                                    "apellido"=>$value['apellido'],
                                                    "estadoEnvioCorreo"=>$enviarCorreoBolean,
                                                    "correo"=>$value['correo'],
                                                    );
                        $texto="[".date("Y-m-d H:i:s")."]" ." Registro Postulante Correo : ".$enviarCorreoBolean." ]";
                        fwrite($handle, $texto);
                        fwrite($handle, "\r\n\n\n\n");
                    }
                    fclose($handle);
                    return response()->json(["mensaje"=>$ObjEstudiante,
                                            "estadoCorreoEnviado"=>$arrayEncargado,
                                            "Siglas"=>"OE"]);
                } catch (\Throwable $th) {
                    $texto="[".date("Y-m-d H:i:s")."]" ."Crear usuario Estudiante Error : ".$th." ]";
                    fwrite($handle, $texto);
                    fwrite($handle, "\r\n\n\n\n");
                    fclose($handle);
                    return response()->json(["mensaje"=>$th->getMessage(),
                                            "request"=>$request->json()->all(),
                                            "Siglas"=>"ONE","error"=>$th->getMessage()]);
                }

            }else{
                return response()->json(["mensaje"=>"Operación No Exitosa no coincide el external user","Siglas"=>"ONE"]);
            }
        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }
    //REGISTRO DE LOGIN
    public function login(Request $request){

        if($request->json()){

            // ========= VALIDACION DEL USUARIO ANTES DE INICIAR EL LOGIN ====
            //existe el usuario
            $usuario=null;
            try {
                $datos=$request->json()->all();
                $usuario=Usuario::where("correo",$datos['correo'])
                ->where("estado",1)
                ->first();
                if($usuario){
                    if(password_verify($datos['password'],$usuario['password'])){
                        // preguntamos que tipo de usuario es
                        try {
                            return response()->json(["mensaje"=>$usuario,"Siglas"=>"OE",200]);

                        } catch (\Throwable $th) {
                            //throw $th;
                            return response()->json(["mensaje"=>"El rol del usuario no se encontro","Siglas"=>"TUNE",400,"error"=>$th->getMessage()]);
                        }
                    }else{
                        return response()->json(["mensaje"=>"Contraseña Incorrecta","Siglas"=>"PI",400]);
                    }

                } // usuario no encontrado
                else{
                    return response()->json(["mensaje"=>"El usuario no existe","Siglas"=>"UNE",400]);
                }
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th->getMessage(),400]);
            }

        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }

}
