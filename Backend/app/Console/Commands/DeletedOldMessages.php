<?php

namespace App\Console\Commands;


use Illuminate\Console\Command;
use App\Models\Estudiante;
//use App\Http\Controllers\EstudianteController;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class DeletedOldMessages extends Command

{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:eliminarMensaje';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
        try {

            $rando=rand(5, 100);
             $res=Estudiante::where("external_es","=","Es3aa844a8-f3e6-4bc2-ad1c-9210bd669e32")
                                ->update(array( 'estado'=>$rando));
                             //   die(json_encode($res));
            $handle = fopen("log.txt", "a");
            $texto="[".date("Y-m-d H:i:s")."]" ." Estado :".$res." Randon : ".$rando;
            fwrite($handle, $texto);
            fwrite($handle, "\r\n\n\n\n");
            fclose($handle);
        } catch (\Throwable $th) {
            dd( $th);
        }
  
    }
}
