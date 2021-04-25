<?php

namespace App\Console\Commands;


use Illuminate\Console\Command;
use App\Models\Estudiante;
use App\Models\Empleador;
use App\Models\OfertasLaborales;
use App\Models\Docente;
use Carbon\Carbon;
//template para correo
use App\Traits\TemplateCorreo;

class NotificarUsuarios extends Command

{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    private $tiempoValidarFormEstudiante=48;// horas
    private $tiempoValidarFormEmpleador=72;// horas
    private $tiempoValidarOfertaLaboral=72;// horas
    private $tiempoDePublicacionOfertaLaboralGestor=24;
    protected $signature = 'command:notificarUsuarios';
    //reutilizando el codigo con los correos
    use TemplateCorreo;

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cuando pasa 48 se envia la notifiacion ';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {

        parent::__construct();

    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

     $this->notificarEstudiante();
     $this->notificarEmpleador();
     $this->notificarOfertaLaboralExpirada();
     $this->notificarOfertaLaboralExpiradaDePublicarGestor();

    }

    private function notificarOfertaLaboralExpirada(){
        $texto="";
        $handle = fopen("log.txt", "a");
        try {
            //selecinar todas la ofertas laborales que hayan expirado su tiemppo
            $ObjOfertaLaboral=OfertasLaborales::join("empleador","empleador.id","=","oferta_laboral.fk_empleador")
            ->join("usuario","usuario.id","empleador.fk_usuario")
            ->select("usuario.correo",
                    "empleador.nom_representante_legal",
                    "empleador.razon_empresa",
                    "oferta_laboral.*"
                    )
            ->where("oferta_laboral.estado","=","1")
            ->where("oferta_laboral.obervaciones","=","")
            ->whereDate('oferta_laboral.updated_at',"<=",Carbon::now()
            ->subHour($this->tiempoValidarOfertaLaboral))
            ->get();
            //
            $parrafoMensaje="Se le informa que la validación de su
                            oferta laboral ha expirado, porfavor vuelva a
                            insistir ingresando a su cuenta y reenviando la oferta";

            $TituloCorreo="Proceso de publicacion de oferta laboral";
            $observaciones="La validación de su oferta laboral ha expirado, porfavor vuelva a insistir reenviando el formulario";
            foreach ($ObjOfertaLaboral as $key => $value) {
                //actulizamos las observacione de la oferta laboral explicando la razon
                $ofertaLaboralBoleand=OfertasLaborales::where("id","=",$value['id'])
                ->update(array( "obervaciones"=>$observaciones));
                //preparamos la plantilla html para enviar al correo
                $plantillaCorreo=$this->templateHtmlCorreo($value['nom_representante_legal'],$parrafoMensaje);
                //enviamos el corrreo
                $enviarCorreoBolean=$this->enviarCorreo( $plantillaCorreo,$value['correo'],getenv("TITULO_CORREO_OFERTA_LABORAL"));
                $texto="[".date("Y-m-d H:i:s")."]" ." Update Oferta laboral validacion Expirado :::
                ::Correo del empleador :".$value['correo']."
                ::Se actualizo el registro de oferta laboral : ".( $ofertaLaboralBoleand ? 'true' : 'false') ."
                :: ↑↑ Estado de envio de correo al empleador: ".($enviarCorreoBolean ? 'true' : 'false');
                fwrite($handle, $texto);
                fwrite($handle, "\r\n\n\n\n");
            }
            fclose($handle);

        } catch (\Throwable $th) {
            $texto="[".date("Y-m-d H:i:s")."]" ." Update Oferta laboral validacion Expirado :::"
            ."::ERROR del empleador :".$th." ]";
            fwrite($handle, $texto);
            fwrite($handle, "\r\n\n\n\n");
            fclose($handle);
        }
    }
    //nofiticar al postulante que su registro ha expirado
    private function notificarEstudiante(){
        $handle = fopen("log.txt", "a");
        try {
            $usuario=Estudiante::join("usuario","usuario.id","=","estudiante.fk_usuario")
            ->select("estudiante.*","usuario.*")
            ->where("estudiante.estado",0)
            ->where("usuario.tipoUsuario",2)
            ->where("estudiante.observaciones","")
            ->whereDate('estudiante.updated_at',"<=",
            Carbon::now()->subHour($this->tiempoValidarFormEstudiante))
            ->get();
            //
            $parrafoMensaje="Se le informa que la validación de su
                            información ha expirado, porfavor vuelva a
                            insistir ingresando a su cuenta y reenviando el
                            formulario de registro";
            //
            $observaciones="La validación de su información ha expirado, porfavor vuelva a insistir reenviando el formulario";
            foreach ($usuario as $key => $value) {
                $estudianteBooleand=Estudiante::where("fk_usuario","=",$value['fk_usuario'])
                ->update(array( 'estado'=>0,"observaciones"=>$observaciones));
                $plantillaCorreo=$this->templateHtmlCorreo(($value['nombre'].' '.$value['apellido']),$parrafoMensaje);
                $enviarCorreoBolean=$this->enviarCorreo( $plantillaCorreo,$value['correo'],getenv("TITULO_CORREO_POSTULANTE"));
                $texto="[".date("Y-m-d H:i:s")."]" ." Update Estudiante Registro Expirado :".$value['correo']." = ".( $estudianteBooleand ? 'true' : 'false') ." ↑↑ Enviar Correo : ".($enviarCorreoBolean ? 'true' : 'false');
                fwrite($handle, $texto);
                fwrite($handle, "\r\n\n\n\n");
            }
            fclose($handle);
        } catch (\Throwable $th) {
            $texto="[".date("Y-m-d H:i:s")."]" ." Error : ".$th." ]";
            fwrite($handle, $texto);
            fwrite($handle, "\r\n\n\n\n");
            fclose($handle);
        }
    }
    //el tiempo de validacion del formulario re registro del empleador expiro
    private function notificarEmpleador(){
            $texto="";
            $handle = fopen("log.txt", "a");
            try {

                $usuario=Empleador::join("usuario","usuario.id","=","empleador.fk_usuario")
                ->select("empleador.*","usuario.*")
                ->where("usuario.estado",0)
                ->where("usuario.tipoUsuario",6)
                ->where("empleador.observaciones","")
                ->whereDate('empleador.updated_at',"<=",Carbon::now()->subHour($this->tiempoValidarFormEmpleador))
                ->get();

                $parrafoMensaje="Se le informa que la validación de su
                información ha expirado, porfavor vuelva a
                insistir ingresando a su cuenta y reenviando el
                formulario de registro";

                $observaciones="La validación de su información ha expirado, porfavor vuelva a insistir reenviando el formulario";
                foreach ($usuario as $key => $value) {
                    $empleadorBooleand=Empleador::join("usuario","usuario.id","empleador.fk_usuario")
                    ->where("empleador.fk_usuario","=",$value['fk_usuario'])
                    ->update(array( 'empleador.estado'=>0,"empleador.observaciones"=>$observaciones));
                    $plantillaHtml=$this->templateHtmlCorreo($value['nom_representante_legal'],"",$parrafoMensaje);
                    $enviarCorreoBolean=$this->enviarCorreo( $plantillaHtml,$value['correo'],getenv("TITULO_CORREO_POSTULANTE"));
                    $texto="[".date("Y-m-d H:i:s")."]" ." Update Empleador registro Expirado :".$value['correo']." = ".( $empleadorBooleand ? 'true' : 'false') ." ↑↑ Enviar Correo : ".($enviarCorreoBolean ? 'true' : 'false');
                    fwrite($handle, $texto);
                    fwrite($handle, "\r\n\n\n\n");
                }
                fclose($handle);
            } catch (\Throwable $th) {
                $texto="[".date("Y-m-d H:i:s")."]" ." Error : ".$th." ]";
                fwrite($handle, $texto);
                fwrite($handle, "\r\n\n\n\n");
                fclose($handle);
            }
        }



    //comunicar al gestor para que publique la oferta
    private function notificarOfertaLaboralExpiradaDePublicarGestor(){
        //enviar correo del registro el encargado
        $texto="";
        $handle = fopen("log.txt", "a");
        try {
            //selecinar todas la ofertas laborales que hayan expirado su tiemppo de publicacion por parte del gestor
            $ObjOfertaLaboral=OfertasLaborales::join("empleador","empleador.id","=","oferta_laboral.fk_empleador")
            ->join("usuario","usuario.id","empleador.fk_usuario")
            ->select("usuario.correo",
                    "empleador.nom_representante_legal",
                    "empleador.razon_empresa",
                    "oferta_laboral.*"
                    )
            ->where("oferta_laboral.estado","=",2)
            ->whereDate('oferta_laboral.updated_at',"<=",Carbon::now()
            ->subHour($this->tiempoDePublicacionOfertaLaboralGestor))
            ->get();

            //enviamo la notificacion al gestor
            $usuarioGestor=Docente::join("usuario","usuario.id","=","docente.fk_usuario")
            ->select("docente.*","usuario.correo")
            ->where("usuario.estado",1)
            ->where("usuario.tipoUsuario",4)
            ->first();
            $parrafoMensaje="";
            $TituloCorreo="Publicacíon de oferta laboral pendientes ";
            //recorrer todos los usuario que sean gestor

            foreach ($ObjOfertaLaboral as $key => $value) {
                //tengo q redacatra el menaje aL ENCAGRADO
                $plantillaCorreo=$this->templateHtmlCorreo($usuarioGestor->correo,$parrafoMensaje);

                $enviarCorreoBolean=$this->enviarCorreo($plantillaCorreo,
                                                        $usuarioGestor->correo,
                                                    $this->de,
                                                    $TituloCorreo);
                //ACTUALIZO EL ESTADO PARA QUE SE VUELVA A REENVIAR EL ESTADO DE LA OFERTA
                $ObjOfertaLaboralUpdate=OfertasLaborales::where("external_of","=", $value['external_of'])
                ->update(array('estado'=>2));
                //========================================
                $texto="[".date("Y-m-d H:i:s")."]"
                ." Oferta laboral pendiente de publicar expirada por parte del gestor
                :: Estado del correo enviado al gestor : "
                .$enviarCorreoBolean
                ."::: El Correo del gestor  es: ".$usuarioGestor->correo."
                :::Estado de la oferta actualizado : ".($ObjOfertaLaboralUpdate ? 'true' : 'false')."
                ::: El nombre de la oferta laboral es: ".$value["puesto"]."
                ::: El Correo del empleador es :"
                .$value['correo']." ]";
                fwrite($handle, $texto);
                fwrite($handle, "\r\n\n\n\n");
                fclose($handle);
            }

        } catch (\Throwable $th) {
            $texto="[".date("Y-m-d H:i:s")."]"
            ." Oferta laboral pendiente de publicar expirada por parte del gestor ERROR :: : "
            .$th." ]";
            fwrite($handle, $texto);
            fwrite($handle, "\r\n\n\n\n");
            fclose($handle);
           die("error");
        }
    }
}

