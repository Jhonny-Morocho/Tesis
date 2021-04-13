<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pagina extends Model{
    //nombre de la tabla
    protected $table="pagina";
    //para saber si en la tabla usamos created_at y update_at
    public $timestamp=true;
    //lista blanca cmapos publicos
    protected $fillable=[
        "fk_encuesta",
        "estado",
        "external_pa",
        "created_at",
        "updated_at"
    ];
    //lista negra campos que no queren que se encuentren facilmente
    public function encuesta(){
        return $this->hasMany('App\Models\Encuesta','fk_encuesta');
    }
    public function pregunta(){
        return $this->hasOne('App\Models\Pregunta','fk_pagina');
    }
}
