<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfertaLaboralEstudiante extends Model
{
    //
        //nombre de la tabla
        protected $table="ofertalaboral_estudiante";
        //para saber si en la tabla usamos created_at y update_at
        public $timestamp=true;
        //lista blanca campos publicos
        protected $fillable=[
            "fk_estudiante",
            "fk_oferta_laboral",
            "estado",
            "observaciones",
            "external_of_est",
            "created_at",
            "updated_at"
        ];

        public function estudiante(){
            //esta tabla pertenece a usuario
            //relaciona al modelo con cual pertenece
            return $this->belongsTo('App\Models\Estudiante','fk_estudiante');
        }
        public function ofertasLaborales(){
            //esta tabla pertenece a usuario
            //relaciona al modelo con cual pertenece
            return $this->belongsTo('App\Models\OfertasLaborales','fk_oferta_laboral');
        }
       
    
}
