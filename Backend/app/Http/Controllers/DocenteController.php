<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Usuario;
use App\Models\Docente;
//permite traer la data del apirest
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Isset_;

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
                        return response()->json(["mensaje"=>"El usuario ".$datos["correo"]." ya existe","Siglas"=>"ONE",400,]);
                    }
                }else{
                    return response()->json(["mensaje"=>"Solo el administrador puede realizar esta operación","Siglas"=>"ONE",200]);
                }
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th->getMessage()]);
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
    public function editarDocente_external_us(Request $request, $external_id){
        if($request->json()){
            $data=$request->json()->all();
            $objUsuario=null;
            try {
                //actualizar los datos del usuario
                //verificar si quiere actulaizar el password
                $booleanActualizoPassword=false;
                if($data["password"]){//comprobamos si esta variable existe
                    $opciones=array('cost'=>12);
                    $password_hashed=password_hash($data["password"],PASSWORD_BCRYPT,$opciones);
                    $objUsuario=Usuario::where("usuario.external_us",$external_id)
                    ->update(array(
                        "password"=>$password_hashed,
                        "estado"=>$data["estado"],
                        "tipoUsuario"=>$data["tipoUsuario"]
                    ));
                    $booleanActualizoPassword=true;
                }else{
                    $objUsuario=Usuario::where("usuario.external_us",$external_id)
                    ->update(array(
                        "password"=>$data["password"],
                        "estado"=>$data["estado"],
                        "tipoUsuario"=>$data["tipoUsuario"]
                    ));
                }
                //actualizar los datos del docente
                $objDocente=Docente::join("usuario","usuario.id","docente.fk_usuario")
                ->where("usuario.external_us",$external_id)
                ->update(array(
                    "nombre"=>$data["nombre"],
                    "apellido"=>$data["apellido"]
                ));
                $arrayUsuarioDocente=array("estadoRegistro"=>$objUsuario,
                                            "actualizoPassword"=>$booleanActualizoPassword,
                                            "estadoDocente"=>$objDocente);
                return response()->json(["mensaje"=>$arrayUsuarioDocente,"Siglas"=>"OE",200,]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$th->getMessage(),
                                            "Siglas"=>"ONE",
                                            "error"=>$th->getMessage(),
                                        400]);
            }
            //die($data);

        }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
        }
    }
    public function obtenerDocente_external_us($external_id){
        try {
            $objDocente=Docente::join("usuario","usuario.id","docente.fk_usuario")
            ->select("usuario.correo",
            "usuario.estado",
            "usuario.tipoUsuario",
            "docente.nombre",
            "docente.apellido"
            )
            ->where("usuario.external_us",$external_id)
            ->first();
            return response()->json(["mensaje"=>$objDocente,"Siglas"=>"OE",200,]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Error",
            "Siglas"=>"ONE",
            "error"=>$th->getMessage(),
            400]);
        }
    }

}
