<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CalificarEmpleador extends Model
{
    //
        //nombre de la tabla
        protected $table="calificar";
        //para saber si en la tabla usamos created_at y update_at
        public $timestamp=true;
        //lista blanca campos publicos
        protected $fillable=[
            "fk_empleador",
            "estrellas",
            "external_cal",
            "created_at",
            "updated_at"
        ];
    public function empleador(){
        //esta tabla pertenece a usuario
        //relaciona al modelo con cual pertenece
        return $this->belongsTo('App\Models\empleador','fk_empleador');
    }
    
}
