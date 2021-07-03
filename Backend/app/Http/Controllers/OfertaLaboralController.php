<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar

use App\Models\Empleador;
use App\Models\OfertasLaborales;
use App\Traits\TemplateCorreo;
use App\Models\Usuario;
use App\Models\Docente;
use App\Models\Estudiante;
use App\Models\OfertaLaboralEstudiante;
use Carbon\Carbon;
use Error;
//permite traer la data del apirest
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

use function PHPUnit\Framework\isEmpty;

class OfertaLaboralController extends Controller
{
    //reutilizando el codigo con los correos
    use TemplateCorreo;

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
                return response()->json(["mensaje"=>$th->getMessage(),
                                            "Siglas"=>"ONE",
                                            "reques"=>$request->json()->all(),
                                        "error"=>$th->getMessage()]);
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
            return response()->json(["mensaje"=> $ObjOfertaLaboral,"Siglas"=>"ONE","error"=>$th->getMessage(),400]);
        }
    }
    // Listar todos las ofertas laborales
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
            ->orderBy('oferta_laboral.id', 'DESC')
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

    // Listar todos las ofertas validadas por el encargado
    public function listarOfertasLaboralesValidadasEncargado(){
        //obtener todos los usuarios que sean postulante
        $ObjOfertasLaborales=null;
        try {
            //obtenemos las que ya estan aprobado usario ==2 y las que se tienen que publicar ==3

            $ObjOfertasLaborales=
            OfertasLaborales::join("empleador","empleador.id","oferta_laboral.fk_empleador")
            ->join("usuario","usuario.id","empleador.fk_usuario")
            ->select("usuario.correo","oferta_laboral.*")
            ->where("oferta_laboral.estado", ">=", 2)
            ->where("oferta_laboral.estado", "<=", 3)
            ->get();
            return response()->json(["mensaje"=>$ObjOfertasLaborales,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$ObjOfertasLaborales,
                                    "Siglas"=>"ONE",
                                    "error"=>$th->getMessage(),
                                    400]);
        }
    }
    // Listar todos las oferta validadas validadas por el gestor
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
                //una ves finalizada la oferta laboral, se le hace llenar el
                $llenarFormularioSISSEG=$this->notificarFinalizacionOfertaFormularioSISEG($external_id);
                //actualizar el estado de los postulantes
                return response()->json(["mensaje"=>"Operación Exitosa",
                        "ObjetaOfertaLaboral"=>$estadoOfertaLaboral,
                        "external_of"=>$external_id,
                        "llenarFormularioSISEGempleador"=>$llenarFormularioSISSEG,
                        "resquest"=>$request->json()->all(),
                        "Siglas"=>"OE",200]);


             //die($data);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$th->getMessage(),
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
                    "external_of"=>$request['external_of'],
                    "nombreEmpresa"=>$usuarioEmpleador->razon_empresa,
                    "correoUsuarioEmpleador"=>$usuarioEmpleador->correo
                );
                //oferta revisada pero no validada tiene q corregir oferta// pór parte del encargado
                if($request['estado']==1 && ($request['obervaciones'])!=""){
                    //
                    $estadoCorreoEnviado=$this->enviarCorreoEncargadoEstadoOferta($external_id,0);
                }
                //reenviar la oferta laboral para que la revisen el encargado de nuevo
                if($request['estado']==1 && ($request['obervaciones'])==""){

                    $estadoCorreoEnviado= $this->enviarCorreoEncargadoOfertaRegistrado($datos,$usuarioEmpleador);
                }
                //oferta validada por el encargado
                if($request['estado']==2){
                    $estadoCorreoEnviado= $this->enviarCorreoGestorOfertaValidada($datos,$usuarioEmpleador);
                }

                //esta publicada la oferta laboral
                if($request['estado']==3){
                    $estadoCorreoEnviado=$this->notificarPublicacionOfertaLaboral($datos);
                }
                return response()->json(["mensaje"=>"Operación Exitosa",
                                        "ObjetoOfertaLaboral"=>$ObjOfertaLaboral,
                                        "resquest"=>$request->json()->all(),
                                        "estadoCorreoEnviado"=>$estadoCorreoEnviado,
                                        "respuesta"=>$ObjOfertaLaboral,
                                        "Siglas"=>"OE",200]);
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$th->getMessage(),
                                            "external_of"=>$external_id,
                                            "resques"=>$request->json()->all(),
                                            "Siglas"=>"ONE","error"=>$th->getMessage()]);
            }
        }else{
            return response()->json(["mensaje"=>"Los datos no tienene el formato deseado","Siglas"=>"DNF",400]);
        }
    }
    public function reactivarOfertaLaboral(Request $request,$external_id){
        if($request->json()){
            $ObjOfertaLaboral=null;
            $postulanteOferta=null;
            try {
                //actualizo el registro del postulante para q vuelva a marcar los 8 dias
                // y se geneere un ciclo
                $postulanteOferta=
                    OfertaLaboralEstudiante::join("oferta_laboral","oferta_laboral.id","ofertalaboral_estudiante.fk_oferta_laboral")
                ->where("oferta_laboral.external_of",$external_id)
                ->update(array('updated_at'=>Carbon::now()));

                // actualizo el estado de la oferta laboral // la puede reactivar de nuevo
                $ObjOfertaLaboral=OfertasLaborales::where("external_of","=", $external_id)
                ->update(array('estado'=>$request['estado']));
                //actualizo el estado de todos los postulantes de su registro
                if($ObjOfertaLaboral){
                    return response()->json(["mensaje"=>"Operación Exitosa",
                                            "ObjetoOfertaLaboral"=>$ObjOfertaLaboral,
                                            "postulanteOfert"=>$postulanteOferta,
                                            "resquest"=>$request->json()->all(),
                                            "respuesta"=>$ObjOfertaLaboral,
                                            "Siglas"=>"OE"
                                            ,200]);

                }else{
                    return response()->json(["mensaje"=>"No se actualizo el estado",
                                            "ObjetoOfertaLaboral"=>$ObjOfertaLaboral,
                                            "postulanteOfert"=>$postulanteOferta,
                                            "resquest"=>$request->json()->all(),
                                            "respuesta"=>$ObjOfertaLaboral,
                                            "Siglas"=>"ONEE",
                                            200]);
                }
            } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$th->getMessage(),
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
            $ObjOfertaLaboral=OfertasLaborales::join("empleador","empleador.id","oferta_laboral.fk_empleador")
            ->join("usuario","usuario.id","empleador.fk_usuario")
            ->select("oferta_laboral.*",
            "usuario.correo",
            "empleador.nom_representante_legal")
            ->where("oferta_laboral.external_of","=",$external_id)->first();
            return $this->retornarOfertaLaboralEncontrado($ObjOfertaLaboral);
        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th->getMessage()]);
        }
    }

    private function retornarOfertaLaboralEncontrado($ObjTitulo){
        if($ObjTitulo!=null){
            return response()->json(["mensaje"=>$ObjTitulo,"Siglas"=>"OE","respuesta"=>"Operación Exitosa"]);
        }else{
            return response()->json(["mensaje"=>$ObjTitulo,"Siglas"=>"ONE","respuesta"=>"No se encontro el título"]);
        }
    }
     //terminar de hacer
     public function eliminarOfertaLaboral(Request $request){
        try {
            //actualizo el texto plano
            $ObjTituloAcademico=OfertasLaborales::where("external_of","=", $request['external_of'])->update(array('estado'=>$request['estado']));

            return response()->json(["mensaje"=>"Operación Exitosa",
                                     "Respuesta"=>$ObjTituloAcademico,200]);

        } catch (\Throwable $th) {
            return response()->json(["mensaje"=>"Operación no Exitosa","Siglas"=>"ONE","error"=>$th]);
        }

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
            ->where("usuario.estado",1)
            ->where("usuario.tipoUsuario",4)
            ->get();
            //recorrer todos los usuario que sean encargado
            $parrafo="Se ha validado la oferta laboral <b>".$datos["nombreOfertaLaboral"].
                        "</b> perteneciente a la empresa ".
                        $datos["nombreEmpresa"]. ", debe realizar la publicación de la misma para que pueda ser visualizada en la plataforma";
            foreach ($usuarioGestor as $key => $value) {
                //tengo q redacatra el menaje a la secretaria
                $plantillaCorreo=$this->templateHtmlCorreo(
                                $value["nombre"]." ".$value["apellido"],
                                $parrafo
                                );
                $enviarCorreoBolean=$this->enviarCorreo($plantillaCorreo,
                                                    $value['correo'],
                                                    getenv("TITULO_CORREO_PUBLICACION_OFERTA"));

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
            return $arrayGestor=array("error"=>$th->getMessage());
        }

    }
    //funcion para enviar correo de todo tipó de notifiacion en la oferta laboral
    private function enviarCorreoEncargadoOfertaRegistrado($datos,$ObjUsuario){
        //enviar correo del registro el encargado
        $texto="";
        $handle = fopen("logRegistroOfertaLaboral.txt", "a");
        //enviamos registro de postulante al encargado a la secretaria
        $usuarioEncargado=Docente::join("usuario","usuario.id","=","docente.fk_usuario")
        ->select("docente.*","usuario.*")
        ->where("usuario.estado",1)
        ->where("usuario.tipoUsuario",5)
        ->get();
        $arrayEncargado=null;
        $plantillaCorreo=null;
        $enviarCorreoBolean=null;
        //recorrer todos los usuario que sean encargado
        foreach ($usuarioEncargado as $key => $value) {
            //tengo q redacatra el menaje a la secretaria
            $parrafo="Se ha registrado la oferta laboral: <b>".
                        $datos["nombreOfertaLaboral"].
                        "</b> del usuario ".$datos["correoUsuarioEmpleador"].
                        ", representante de la empresa <b>".$datos["nombreEmpresa"]."</b>";
            $plantillaHtmlCorreo=
                $this->templateHtmlCorreo(
                                            $value["nombre"]." ".$value["apellido"],
                                            $parrafo
                                        );
            $enviarCorreoBolean=$this->enviarCorreo($plantillaHtmlCorreo,
                                                $value['correo'],
                                                getenv("TITULO_CORREO_PUBLICACION_OFERTA"));

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
        if($estadoValidacion==1){// si el estado es 1, siginifica que el postulante esta validado
            $mensaje="ha salido validada exitosamente ";
        }
        if($estadoValidacion==0){// si el estado es 0, siginifica que el postulante no esta validado
            $mensaje="tiene algunas inconsistencias, por favor revise su información y vuelva a intentar";
        }
        $texto="";
        $handle = fopen("logRegistroOfertaLaboral.txt", "a");
        $arrayEmpleador=null;
        try {
            //enviamos el estado de la oferta al empleador
            $usuarioEmpleador=$this->buscarUsuarioEmpleador($external_oferta);
            $nombreUsuario= $usuarioEmpleador->nom_representante_legal.
                            " representante de la empresa ".$usuarioEmpleador->razon_empresa;
            $tituloMensaje="Estado de validación de la oferta laboral <b>".$usuarioEmpleador->puesto."</b>";

            $parrafoMensaje="La oferta <b>".$usuarioEmpleador->puesto."</b> ".$mensaje;
            $plantillaCorreo=$this->templateHtmlCorreo($nombreUsuario,$parrafoMensaje);

            $enviarCorreoBolean=$this->enviarCorreo($plantillaCorreo,
                                                    $usuarioEmpleador['correo'],
                                                    getenv("TITULO_CORREO_PUBLICACION_OFERTA")
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
            ." Estado de validación de oferta laboral : ".$th->getMessage()." ]";
            fwrite($handle, $th);
            fwrite($handle, "\r\n\n\n\n");
            fclose($handle);
            return  $th->getMessage();
        }
    }

    //se notifica la aprobacion de la oferta laboral por parte del getor a los estudiante y empleadores
    //corresponde al proceso 4
    private function notificarPublicacionOfertaLaboral($datosOFertaLaboral){
        $texto="";
        $arrayCorreoEstudiantes=null;
        $handle = fopen("logRegistroOfertaLaboral.txt", "a");
        try {
            $empleador=OfertasLaborales::join("empleador","empleador.id","oferta_laboral.fk_empleador")
            ->where("oferta_laboral.external_of",$datosOFertaLaboral['external_of'])
            ->first();
            // notificar al empleador que su oferta laboral esta publicada en la plataforma
            $parrafo="La Oferta laboral <b>".$datosOFertaLaboral['nombreOfertaLaboral']."</b> esta aprobada y publicada con éxito";
            $templateCorreoHmtlEmpleador=
                                    $this->templateHtmlCorreo( $empleador['nom_representante_legal'],
                                                                $parrafo
                                                            );

            $enviarCorreoBoleanEmpleador=
                                    $this->enviarCorreo($templateCorreoHmtlEmpleador,
                                                        $datosOFertaLaboral['correoUsuarioEmpleador'],
                                                        getenv('TITULO_CORREO_PUBLICACION_OFERTA'));

            // nnotificar de la nueva oferta laboral publicada a todos los postulante que esten inscrito en la pagina
            $usuarioEstudiante=Estudiante::join("usuario","usuario.id","estudiante.fk_usuario")
            ->select("usuario.correo","estudiante.*")
            ->where("estudiante.estado",1)
            ->get();

            $parrafoEstudiante="Existe una nueva oferta laboral publicada denominada <b>".$datosOFertaLaboral['nombreOfertaLaboral']."</b>";
            foreach ($usuarioEstudiante as $key => $value) {
                $plantillaHmtlCorreo=
                                    $this->templateHtmlCorreo($value['nombre']." ".$value['apellido'],
                                                                        $parrafoEstudiante
                                                                        );
                $enviarCorreoBolean=$this->enviarCorreo($plantillaHmtlCorreo,$value['correo'],getenv("TITULO_CORREO_PUBLICACION_OFERTA"));
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

    //una vez finalizada la oferta hacer que llene el formulario del SISSEG AL EMPLEADOR
    private function notificarFinalizacionOfertaFormularioSISEG($external_of){
        $empleador=$this->buscarUsuarioEmpleador($external_of);
        $texto="";
        $handle = fopen("logRegistroOfertaLaboral.txt", "a");
        try {
            // notificar al empleador que su oferta laboral esta publicada en la plataforma
            $parrafo="Muchas gracias por participar en este proceso, tu oferta laboral ha finalizado,
                      sírvase por favor de llenar la siguiente encuesta ".
                      "<a href=".getenv('SISSEG_EPLEADOR').">".
                     getenv('SISSEG_EPLEADOR') ."</a> de ante mano se le agradece su colaboración ";

            $templateCorreoHmtlEmpleador=
                                    $this->templateHtmlCorreo($empleador['nom_representante_legal'],
                                                                $parrafo
                                                            );

            $enviarCorreoBoleanEmpleador=
                                    $this->enviarCorreo($templateCorreoHmtlEmpleador,
                                                        $empleador['correo'],
                                                        getenv('TITULO_CORREO_APLICAR_OFERTA'));

            $texto="[".date("Y-m-d H:i:s")."]"
                    ." LLENAR FORMULARIO DEL SISSEG EMPLEADOR :
                    ::Estado de enviar correo al empleador : ".$enviarCorreoBoleanEmpleador
                    ."::: El Correo del empleador  es: ".$empleador['correo']." ] ";
            $arrayCorreoEmpleador=array(
                "estadoEnviarCorreoEmpleadorSISEG"=>$enviarCorreoBoleanEmpleador,
                "correoEmpleador"=>$empleador['correo']
            );
            fwrite($handle, $texto);
            fwrite($handle, "\r\n\n\n\n");
            fclose($handle);
            return $arrayCorreoEmpleador;
        } catch (\Throwable $th) {
                $texto="[".date("Y-m-d H:i:s")."]"
                ." LLENAR FORMULARIO DEL SISSEG EMPLEADOR ERROR: ".$th->getMessage()."  ]";
                fwrite($handle, $texto);
                fwrite($handle, "\r\n\n\n\n");
                fclose($handle);
            return $arrayCorreoEmpleador=array("error"=>$th->getMessage());
        }

    }
}
