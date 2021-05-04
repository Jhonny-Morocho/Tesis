<?php

namespace App\Http\Controllers;

//llamar los modelos q voy a ocupar
use App\Models\Usuario;
use App\Models\Empleador;
use App\Models\CalificarEmpleador;
//permite traer la data del apirest
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\Foreach_;
use PhpParser\Node\Stmt\TryCatch;
use function PHPUnit\Framework\isEmpty;

class CalificarEmpleadorController extends Controller
{
    //formulario de estudiante comparando el external_us y externarl_es//creamos un estudiante
     public function calificarEmpleador(Request $request){
         if($request->json()){
             //validar si el usuario existe
             $ObjCalificar=null;
             try {
                 //code...
                 $ObjCalificar=new CalificarEmpleador();
                 $ObjCalificar->fk_empleador=$request['fk_empleador'];
                 $ObjCalificar->estrellas=$request['estrellas'];
                 $ObjCalificar->external_cal="Cal".Utilidades\UUID::v4();
                 $ObjCalificar->save();
                 return response()->json(["mensaje"=>"Registro guardado","Siglas"=>"OE","respuest"=>$ObjCalificar,200]);
             } catch (\Throwable $th) {
                return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th->getMessage(),"respuesta"=>$ObjCalificar,400]);
             }

         }else{
            return response()->json(["mensaje"=>"La data no tiene formato deseado","Siglas"=>"DNF",400]);
         }
     }


     public function promedioCalificacionEmpleador($external_id){
         $premedio=1;
         try {
             $ObjCalificacion=CalificarEmpleador::where("fk_empleador",$external_id)
             ->get();
             $numRegistros=1;
             $califiacionUnitaria=0;
             foreach ($ObjCalificacion as $key => $value) {
                 $numRegistros++;
                 $califiacionUnitaria=$value["estrellas"]+ $califiacionUnitaria;
             }
             $premedio=round($califiacionUnitaria/$numRegistros);
             return response()->json(["mensaje"=>$premedio,"Siglas"=>"OE",200]);
         } catch (\Throwable $th) {
            return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th->getMessage(),400]);
         }
     }
     public function promedioCalificacionEmpleadorTodos(){
        $ObjCalificacion=array();
        try {
            //seleccionar todos lo empleadores
            $ObjEmpleador=Empleador::get();
            foreach ($ObjEmpleador as $key => $value) {
                $suma=CalificarEmpleador::where("fk_empleador",$value['id'])->sum('estrellas');
                $numItem=CalificarEmpleador::where("fk_empleador",$value['id'])->count();
                //division entre cero
                if($numItem==0){
                    $numItem=1;
                }
                 $ObjCalificacion[$key]=array(
                    "empleadorExternal_em"=>$value['external_em'],
                    "empleadorId"=>$value['id'],
                    "empleadorCalificacionSuma"=>$suma,
                    "empleadorCantidad"=>$numItem,
                    "empleadorPromedio"=>($suma/$numItem)
                 );
                // ->get();
            }
            return response()->json(["mensaje"=>$ObjCalificacion,"Siglas"=>"OE",200]);
        } catch (\Throwable $th) {
           return response()->json(["mensaje"=>$th->getMessage(),"Siglas"=>"ONE","error"=>$th->getMessage(),400]);
        }
    }






}
