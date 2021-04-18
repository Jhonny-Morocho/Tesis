<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Usuario;
use App\Models\Docente;
use App\Models\Estudiante;
//permite traer la data del apirest
use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use SebastianBergmann\Template\Template;

class DocenteController extends Controller
{
   
    public function registrarDocente(Request $request,$external_id){
        
        if($request->json()){
            //obtengo todos los datos y lo guardo en la variable datos
            $datos=$request->json()->all();
            //creamos un objeto de tipo usuario para enviar los datos
            try {
                //verificar si el usuario es un administrador
                $usuarioAdmin=Usuario::where("external_us",$external_id)->first();
                if($usuarioAdmin->tipoUsuario==4){
                    $existeUsuario=Usuario::where("correo",$datos['correo'])->first();
                    if(is_null($existeUsuario)){
                        $ObjUsuario=new Usuario();
                        $ObjUsuario->correo=$datos["correo"];
                        $opciones=array('cost'=>12);
                        $passwordCliente=$datos["password"];
                        $password_hashed=password_hash($passwordCliente,PASSWORD_BCRYPT,$opciones);
                        $ObjUsuario->password=$password_hashed;
                        $ObjUsuario->tipoUsuario=$datos["tipoUsuario"];
                        $ObjUsuario->estado=$datos["estado"];
                        $ObjUsuario->external_us="UuA".Utilidades\UUID::v4();
                        $ObjUsuario->save();

                        //agregar docente
                        $objDocente=new Docente();
                        $objDocente->nombre=$datos["nombre"];
                        $objDocente->apellido=$datos["apellido"];
                        $objDocente->estado=$datos["estado"];
                        $objDocente->fk_usuario=$ObjUsuario->id;
                        $objDocente->external_do="UuA".Utilidades\UUID::v4();
                        $objDocente->save();

                        $arrayUsuarioDocente=array("estadoUsuario"=>$ObjUsuario,"estadoDocente"=>$objDocente);
                        return response()->json(["mensaje"=>$arrayUsuarioDocente,"Siglas"=>"OE",200,]);

                    }else{
                        return response()->json(["mensaje"=>"Operacion no exitosa, el correo ya existe","Siglas"=>"ONE",400,]);
                    }
                }else{
                    return response()->json(["mensaje"=>"Solo el administrador puede realizar esta operación","Siglas"=>"ONE",200]);
                }
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Error","Siglas"=>"ONE","error"=>$th->getMessage()]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
 
    }
    public function listarDocentes(){
        try {
            $objDocente=Docente::join("usuario","usuario.id","docente.fk_usuario")
            ->select("usuario.correo",
            "usuario.estado",
            "usuario.tipoUsuario",
            "usuario.updated_at",
            "usuario.external_us",
            "docente.nombre",
            "docente.apellido")
            ->get();
            return response()->json(["mensaje"=>$objDocente,"Siglas"=>"OE",200,]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Error","Siglas"=>"ONE","error"=>$th->getMessage()]);
        }

    }

}
