<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ciudades extends Model
{
    
    //nombre de la tabla
    protected $table="ciudad";
    //para saber si en la tabla usamos created_at y update_at
    public $timestamp=true;
    //lista blanca campos publicos
    protected $fillable=[
        "fk_provincia",
        "nombre"
    ];
    
    public function CursosCapacitaciones(){
        return $this->hasMany('App\Models\provincias','fk_provincia');
    }
}
