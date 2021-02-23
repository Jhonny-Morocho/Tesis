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
        "ciudad",
        "provincia",
        "telefono",
        "direccion",
        "observaciones",
        "external_us"
    ];
     public function usuario(){
         //esta tabla pertenece a usuario
         //relaciona al modelo con cual pertenece
         return $this->belongsTo('App\Models\usuario','fk_usuario');
     }
}
