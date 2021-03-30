<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empleador extends Model
{
    
    //nombre de la tabla
    protected $table="empleador";
    //para saber si en la tabla usamos created_at y update_at
    public $timestamp=true;
    //lista blanca campos publicos
    protected $fillable=[
        "fk_usuario",
        "razon_empresa",
        "tipo_empresa",
        "actividad_ruc",
        "num_ruc",
        "cedula",
        "nom_representante_legal",
        "fk_ciudad",
        "fk_provincia",
        "telefono",
        "estado",
        "direccion",
        "observaciones",
        "external_em"
    ];
     public function usuario(){
         //esta tabla pertenece a usuario
         //relaciona al modelo con cual pertenece
         return $this->belongsTo('App\Models\Usuario','fk_usuario');
     }
     public function OfertaLaboralEstudiante(){
        return $this->hasMany('App\Models\CalificarEmpleador','fk_empleador');
    }
     
}
