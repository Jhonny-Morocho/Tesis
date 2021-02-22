<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    //nombre de la tabla
    protected $tabla="docente";
    //para saber si en la tabla usamos created_at y update_at
    public $timestamp=true;
    //lista blanca campos publicos
    protected $filasTabla=[
        "fk_usuario",
        "tipo_docente",
        "external_do",
        "created_at",
        "updated_at"
    ];

    public function usuario(){
        //esta tabla pertenece a usuario
        //relaciona al modelo con cual pertenece
        return $this->belongsTo('App\Models\usuario','fk_usuario');
    }
}
