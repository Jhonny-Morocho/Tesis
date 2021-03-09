<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TitulosAcademicos extends Model
{
    
    //nombre de la tabla
    protected $table="titulos_academicos";
    //para saber si en la tabla usamos created_at y update_at
    public $timestamp=true;
    //lista blanca campos publicos
    protected $fillable=[
        "fk_estudiante",
        "titulo_obtenido",
        "numero_registro",
        "tipo_titulo",
        "nivel_instruccion",
        "detalles_adiciones",
        "evidencias_url",
        "external_ti",
        "external_ti",
        "estado",
        "created_at",
        "updated_at"
    ];
    public function estudiante(){
        return $this->belongsTo('App\Models\Estudiante','fk_estudiante');
    }

}
