<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model{
    //nombre de la tabla
    protected $table="usuario";
    //para saber si en la tabla usamos created_at y update_at
    public $timestamp=true;
    //lista blanca cmapos publicos
    protected $fillable=[
        "correo",
        "password",
        "tipoUsuario",
        "estado",
        "external_us",
        "created_at",
        "updated_at"
    ];
    //lista negra campos que no queren que se encuentren facilmente
    public function docente(){
        return $this->hasOne('App\Models\Docente','fk_usuario');
    }
    public function estudiante(){
        return $this->hasOne('App\Models\Estudiante','fk_usuario');
    }
    public function empleador(){
        return $this->hasOne('App\Models\Empleador','fk_usuario');
    }
}
