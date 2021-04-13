<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pregunta extends Model{
    //nombre de la tabla
    protected $table="pregunta";
    //para saber si en la tabla usamos created_at y update_at
    public $timestamp=true;
    //lista blanca cmapos publicos
    protected $fillable=[
        "fk_pagina",
        "tipo_input",
        "nombre_input",
        "titulo_label",
        "objeto",
        "estado",
        "external_pr",
        "created_at",
        "updated_at"
    ];
    //lista negra campos que no queren que se encuentren facilmente
    public function pagina(){
        return $this->hasMany('App\Models\Pregunta','fk_pagina');
    }
}
