<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Encuesta extends Model{
    //nombre de la tabla
    protected $table="encuesta";
    //para saber si en la tabla usamos created_at y update_at
    public $timestamp=true;
    //lista blanca cmapos publicos
    protected $fillable=[
        "nombre_encuesta",
        "tipo_encuesta",
        "estado",
        "external_en",
        "created_at",
        "updated_at"
    ];
    //lista negra campos que no queren que se encuentren facilmente
    public function docente(){
        return $this->hasOne('App\Models\Pagina','fk_pagina');
    }
}
