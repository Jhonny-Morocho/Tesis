<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paises extends Model
{
    
    //nombre de la tabla
    protected $table="paises";
    //para saber si en la tabla usamos created_at y update_at
    public $timestamp=true;
    //lista blanca campos publicos
    protected $fillable=[
        "iso",
        "nombre"
    ];
    
    public function CursosCapacitaciones(){
        return $this->hasMany('App\Models\cursoscapacitaciones','fk_estudiante');
    }
}
