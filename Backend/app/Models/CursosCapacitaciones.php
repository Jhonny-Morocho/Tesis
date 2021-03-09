<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CursosCapacitaciones extends Model
{
    
    //nombre de la tabla
    protected $table="cursos_capacitaciones";
    //para saber si en la tabla usamos created_at y update_at
    public $timestamp=true;
    //lista blanca campos publicos
    protected $fillable=[
        "fk_pais",
        "fk_estudiante",
        "nom_evento",
        "tipo_evento",
        "auspiciante",
        "horas",
        "fecha_inicio",
        "fecha_culminacion",
        "evidencia_url",
        "estado",
        "external_cu",
        "created_at",
        "updated_at"
    ];
    public function estudiante(){
        return $this->belongsTo('App\Models\Estudiante','fk_estudiante');
    }

    public function paises(){
        return $this->belongsTo('App\Models\Paises','fk_pais');
    }

}
