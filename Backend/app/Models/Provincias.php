<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provincias extends Model
{
    
    //nombre de la tabla
    protected $table="provincia";
    //para saber si en la tabla usamos created_at y update_at
    public $timestamp=true;
    //lista blanca campos publicos
    protected $fillable=[
        "nombre"
    ];
    
    public function CursosCapacitaciones(){
        return $this->hasOne('App\Models\empleador','fk_provincia');
    }
}
