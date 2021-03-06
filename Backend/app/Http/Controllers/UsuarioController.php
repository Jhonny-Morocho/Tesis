<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Usuario;
use App\Models\Docente;
use App\Models\Empleador;
use App\Models\Estudiante;
//permite traer la data del apirest
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class UsuarioController extends Controller
{
    //Registrar Usuario
    
    public function RegistrarUsuario(Request $request){
        //code...
        if($request->json()){
            //obtengo todos los datos y lo guardo en la variable datos
            $datos=$request->json()->all();
            //creamos un objeto de tipo usuario para enviar los datos
            try {
                //code...
                $ObjUsuario=new Usuario();
                $ObjUsuario->correo=$datos["correo"];
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
                return response()->json(["mensaje"=>"Operacion No Exitosa ,El correo ya existe","Siglas"=>"ONE","error"=>$th]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
 
    }

    //Registrar docente
    //(obtengo todos los datos del formulario,el id a comparar)
    public function RegistrarDocente(Request $request,$external_id){
  
        if($request->json()){
   
            $datos=$request->json()->all();
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();

           // die(json_encode($ObjUsuario));
            // tipo de usuario decente ==1
            if($ObjUsuario->tipoUsuario==1 && $ObjUsuario->tipoUsuario !=null){
                //creo un objeto Docente para guardar el nuevo decente
                $ObjDocente=new Docente();
                $ObjDocente->fk_usuario=$ObjUsuario->id;
                $ObjDocente->tipo_docente=$datos["tipo_docente"];
                $ObjDocente->external_do="Doc".Utilidades\UUID::v4();
                $ObjDocente->save();
           
                return response()->json(["mensaje"=>"Operacion Exitosa","Siglas"=>"OE"]);
            }else{
                return response()->json(["mensaje"=>"Operacion No Exitosa, el usuario no se encontro","Siglas"=>"ONE"]);
            }
        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }
    public function RegistrarEstudiante(Request $request,$external_id){
        if($request->json()){
            $datos=$request->json()->all();
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            //verificar si el external user es igual
            if($ObjUsuario['external_us']===$external_id){
                //verificar si existe ese tipo o rol de usuario
                if($ObjUsuario->tipoUsuario==2){
                    //creo un objeto para guardar el estudiante
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
                        return response()->json(["mensaje"=>$ObjEstudiante,"Siglas"=>"OE"]);
                    } catch (\Throwable $th) {
                        return response()->json(["mensaje"=>"Operacion No Exitosa, El usuario ya existe","Siglas"=>"ONE","error"=>$th]);
                    }
                }else{
                    return response()->json(["mensaje"=>"Operacion No Exitosa no se encontro el tipo de usuario","Siglas"=>"ONETU"]);
                } 

            }else{
            
                return response()->json(["mensaje"=>"Operacion No Exitosa no coincide el external user","Siglas"=>"ONE"]);
            }
        
                
        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }
    public function RegistrarEmpleador(Request $request,$external_id){
        if($request->json()){
            $datos=$request->json()->all();
            echo "external usuario es ".$external_id;
            $ObjUsuario=Usuario::where("external_us",$external_id)->first();
            // 5 es empleador
            if($ObjUsuario->tipoUsuario==5){
                //creo un objeto Docente para guardar el nuevo decente
                $ObjEmpleador=new Empleador();
                $ObjEmpleador->fk_usuario=$ObjUsuario->id;
                $ObjEmpleador->razon_empresa=$datos["razon_empresa"];
                $ObjEmpleador->tipo_empresa=$datos["tipo_empresa"];
                $ObjEmpleador->actividad_ruc=$datos["actividad_ruc"];
                $ObjEmpleador->num_ruc=$datos["num_ruc"];
                $ObjEmpleador->cedula=$datos["cedula"];
                $ObjEmpleador->ciudad=$datos["ciudad"];
                $ObjEmpleador->provincia=$datos["provincia"];
                $ObjEmpleador->telefono=$datos["telefono"];
                $ObjEmpleador->direccion=$datos["direccion"];
                $ObjEmpleador->observaciones=$datos["observaciones"];
                $ObjEmpleador->external_us="Em".Utilidades\UUID::v4();
                $ObjEmpleador->save();
                return response()->json(["mensaje"=> $ObjEmpleador,"Siglas"=>"OE"]);
            }else{
                return response()->json(["mensaje"=>"Operacion No Exitosa no se encontro el usuario external","Siglas"=>"ONE"]);
            } 
                
        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }

     //REGISTRO DE LOGIN
     public function login(Request $request){
        
        global $respuestaUsuario;
        if($request->json()){
            $datos=$request->json()->all();
            $usuario=Usuario::where("correo",$datos['correo'])->first();
            // ========= VALIDACION DEL USUARIO ANTES DE INICIAR EL LOGIN ====
            //existe el usuario 
            if($usuario){
                if(password_verify($datos['password'],$usuario['password'])){
                    // preguntamos que tipo de usuario es 
                   switch ($usuario['tipoUsuario']) {
                        //usuario inactivo
                        case 0:
                        # inactivo
                        return response()->json(["mensaje"=>$usuario,"Siglas"=>"UNA",400]);
                        break;

                       //estudiante
                       case 2:
                        # code...
                        return response()->json(["mensaje"=>$usuario,"Siglas"=>"OE",200]);
                        break;

                        //secretara
                        case 3:
                            # code...
                            return response()->json(["mensaje"=>$usuario,"Siglas"=>"OE",200]);
                            break;
                            //encargado
                       case 5:
                        # code...
                        break;
                       
                       default:
                           # code...
                           return response()->json(["mensaje"=>"El tipo de usuario no encontrado","Siglas"=>"TUNE",400]);
                           break;
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

     public function listarPostulanteFormulario(Request $request){
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
     // Listar todos los postulante con sus datos de formulario
     public function listarAllPostulantesFormulario(){
            //validar si el usuario existe
            $ObjUsuario = usuario::all();
            die(json_encode($ObjUsuario));
      return true;
        //     if($ObjUsuario!=null){
        //         $ObjEstudiante = estudiante::where("fk_usuario","=", $ObjUsuario->id)->first();
        //         if($ObjEstudiante !=null){
        //             return response()->json(["mensaje"=> $ObjEstudiante,"Siglas"=>"OE"]);
        //         }else{
        //            return response()->json(["mensaje"=>"Operacion No Exitosa, no existe registro de formulario del estudiante","Siglas"=>"ONE"]);
        //         }
   
        //    }else{
        //        return response()->json(["mensaje"=>"Operacion No Exitosa no se encontro el usuario external_us","Siglas"=>"ONE"]);
        //    }

    }
}
