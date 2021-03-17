<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    //
        //nombre de la tabla
        protected $table="estudiante";
        //para saber si en la tabla usamos created_at y update_at
        public $timestamp=true;
        //lista blanca campos publicos
        protected $fillable=[
            "fk_usuario",
            "nombre",
            "apellido",
            "cedula",
            "estado",
            "telefono",
            "fecha_nacimiento",
            "direccion_domicilio",
            "genero",
            "observaciones",
            "external_es"
        ];
    public function usuario(){
        //esta tabla pertenece a usuario
        //relaciona al modelo con cual pertenece
        return $this->belongsTo('App\Models\usuario','fk_usuario');
    }
    public function titulosacademicos(){
        return $this->hasMany('App\Models\titulosacademicos','fk_estudiante');
    }
    //
    public function cursoscapacitaciones(){
        return $this->hasMany('App\Models\cursoscapacitaciones','fk_estudiante');
    }
    public function ofertaLaboralEstudiante(){
        return $this->hasMany('App\Models\OfertaLaboralEstudiante','fk_estudiante');
    }
   
    
}
