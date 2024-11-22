/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-fallthrough */
import {useEffect, useRef, useState} from 'react';

enum Operator {
  add = '+',
  subtract = '-',
  multiply = '*',
  divide = '/',
}
export const useCalculator = () => {
  const [formula, setFormula] = useState('');
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPrevNumber(`${subResult}`);
  }, [formula]);


  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
    lastOperation.current = undefined;
    setFormula('');
  };

  const deleteOperation = () => {};

  const toggleSign = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };
  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') {
      return; // Evitar múltiples puntos decimales
    }

    // Si el número actual es '0' o '-0'
    if (number === '0' || number === '-0') {
      // Si se presiona un punto decimal, agregar '0.'
      if (numberString === '.') {
        return setNumber(number + numberString); // Cambiar a '0.'
      }
      // Si se presiona un número diferente de '0', reemplazar el '0'
      if (numberString !== '0') {
        return setNumber(numberString); // Cambiar a 'número ingresado'
      }
      // Si se presiona '0', no hacer nada
      return;
    }
    // Si ya hay un punto decimal
    if (number.includes('.')) {
      // Permitir agregar otro '0'
      if (numberString === '0') {
        return setNumber(number + numberString);
      }
    }
    // Concatenar el número normalmente
    setNumber(number + numberString);
  };

  const setLastNumber = () => {
    calculateResult();
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };
  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };
  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(`${ result }`);

    lastOperation.current = undefined;
    setPrevNumber('0');
  };

  const calculateSubResult = (): number => {

    const [ firstValue, operation, secondValue] = formula.split(' ');

    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if( isNaN( num2 )) {return num1;}
    switch ( operation ) {

      case Operator.add:
        return num2 + num1;

      case Operator.subtract:
        return num1 - num2;

      case Operator.multiply:
        return num2 * num1;

      case Operator.divide:
        return num1 / num2;

      default:
        throw new Error('Operation not implemented');
    }
  };
  return {
    //Properties
    number,
    prevNumber,
    formula,
    //Methods
    buildNumber,
    toggleSign,
    clean,
    deleteOperation,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateResult,
  };
};
