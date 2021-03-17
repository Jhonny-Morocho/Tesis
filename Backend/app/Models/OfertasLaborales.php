<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfertasLaborales extends Model
{
    
    //nombre de la tabla
    protected $table="oferta_laboral";
    //para saber si en la tabla usamos created_at y update_at
    public $timestamp=true;
    //lista blanca campos publicos
    protected $fillable=[
        "fk_empleador",
        "puesto",
        "descripcion",
        "lugar",
        "obervaciones",
        "requisitos",
        "estado",
        "external_of",
        "created_at",
        "updated_at"
    ];
    public function empleador(){
        return $this->belongsTo('App\Models\Empleador','fk_empleador');
    }
    public function ofertaLaboralEstudiante(){
        return $this->hasMany('App\Models\OfertaLaboralEstudiante','fk_oferta_laboral');
    }
}
