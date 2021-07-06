import { AbstractControl, ValidatorFn } from "@angular/forms";

import { FormControl } from '@angular/forms';

const valCedula = (cedula): boolean => {
    if (cedula.length === 10) {
        const first2Digits = cedula.substring(0, 2);
        if (parseInt(first2Digits, 10) < 25 && parseInt(first2Digits, 10) > 0) {
            let total = 0;
            for (let i = 0; i < 9; i++) {
                const currD = parseInt(cedula.substring(i, i + 1), 10);
                total += (i % 2 === 0) ? ((currD * 2 > 9) ? currD * 2 - 9 : currD * 2) : (parseInt(cedula.substring(i, i + 1), 10));
            }
            total = total % 10;
            total = (total === 0) ? 0 : 10 - total;
            if (total === parseInt(cedula.substring(cedula.length - 1, cedula.length), 10)) {
                return true;
            }
        }
    }
    return false;
};

const soloNumeros = (value): boolean => {
    const regex = /^[0-9]+$/;
    return regex.test(value.trim());
};

const validaJuridico = (ruc, ultimosDigitos): boolean => {
    if (ruc.substring(10, 13) !== '000') {
        ultimosDigitos = parseInt(ultimosDigitos, 10);
        if (ultimosDigitos > 0 && ultimosDigitos < 1000) {
            return modulo11(ruc.substring(0, 9), ruc.substring(9, 10), [4, 3, 2, 7, 6, 5, 4, 3, 2]);
        }
    }
    return false;
};

const validaPublico = (ruc, ultimosDigitos): boolean => {
    if (ruc.substring(9, 13) !== '0000') {
        ultimosDigitos = parseInt(ultimosDigitos, 10);
        if (ultimosDigitos > 0 && ultimosDigitos < 10000) {
            return modulo11(ruc.substring(0, 8), ruc.substring(8, 9), [3, 2, 7, 6, 5, 4, 3, 2]);
        }
    }
    return false;
};

const validaNatural = (ruc, ultimosDigitos): boolean => {
    if (ruc.substring(10, 13) !== '000') {
        ultimosDigitos = parseInt(ultimosDigitos, 10);
        if (ultimosDigitos > 0 && ultimosDigitos < 1000) {
            return valCedula(ruc.substring(0, 10));
        }
    }
    return false;
};

const modulo11 = (firstDigits, digit, coefficients): boolean => {
    let total = 0,
        result = 0,
        residue = 0;
    firstDigits = firstDigits.split('');
    coefficients.forEach((valor, indice) => {
        total = total + (parseInt(valor, 10) * parseInt(firstDigits[indice], 10));
    });
    residue = total % 11;
    result = (residue === 0) ? 0 : 11 - residue;
    return result === parseInt(digit, 10);
};

const valRuc = (ruc): boolean => {
    const pass = soloNumeros(ruc);
    const tam = ruc.length;
    if (!pass || tam > 13) {
        return false;
    }
    const tercerDigito = ruc.substring(2, 3);
    const ultimosDigitos = ruc.substring(10, 13);
    switch (tercerDigito) {
        case '9':
            return validaJuridico(ruc, ultimosDigitos);
            break;
        case '6':
            return validaPublico(ruc, ultimosDigitos);
            break;
        default:
            const intTD = parseInt(tercerDigito, 10);
            return (intTD >= 0 && intTD < 6) ? validaNatural(ruc, ultimosDigitos) : false;
            break;
    }
};

export function validateRuc(numRuc:any) {
    if (valRuc(numRuc)){
        return true;
    }
    return false;
}

