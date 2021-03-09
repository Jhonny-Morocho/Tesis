<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar

use App\Models\TitulosAcademicos;
use App\Models\Estudiante;
use Error;
//permite traer la data del apirest
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class TitulosAcademicosController extends Controller
{
    //Registrar Usuario
    
    public function RegistrarTitulo(Request $request,$external_id){
        //code...
        if($request->json()){
            //obtengo todos los datos y lo guardo en la variable datos
            $datos=$request->json()->all();
            //pregunto si el extern_us es del usuario que realiza la peticion
            $Objestudiante=Estudiante::where("external_es",$external_id)->first();
            //creamos un objeto de tipo usuario para enviar los datos
            try {
                //code...
                //die(json_encode($datos));
                $ObjTituloAcademico=new TitulosAcademicos();
                $ObjTituloAcademico->fk_estudiante=$Objestudiante->id;
                $ObjTituloAcademico->titulo_obtenido=$datos["titulo_obtenido"];
                $ObjTituloAcademico->numero_registro=$datos["numero_registro"];
                $ObjTituloAcademico->estado=$datos["estado"];
                $ObjTituloAcademico->tipo_titulo=$datos["tipo_titulo"];
                $ObjTituloAcademico->nivel_instruccion=$datos["nivel_instruccion"];
                $ObjTituloAcademico->detalles_adiciones=$datos["detalles_adiciones"];
                $ObjTituloAcademico->evidencias_url=$datos["evidencias_url"];
                $ObjTituloAcademico->external_ti="Ti".Utilidades\UUID::v4();
                $ObjTituloAcademico->save();
                //respuesta exitoso o no en la inserrccion
                return response()->json(["mensaje"=>"Operacion Exitosa","Siglas"=>"OE",200,]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>"Operacion No Exitosa","Siglas"=>"ONE","error"=>$th]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
 
    }
}
