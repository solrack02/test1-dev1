
// ---------- import Packs
import JSON5 from 'json5';
import { Style, getStylesForProperty } from 'css-to-react-native';

// ---------- import Local Tools
import { getVarValue } from './getVarValue';

// ----------- set Style Variable Selection
export const getStlValues = (arrGetValues: string[]) => {
  console.log('GET_VAR_VALUES', { arrGetValues });
  const replaceVarsInString = (inputStr: string) => {
    console.log({ inputStr });
    return inputStr.replace(/"$var_[w.]+"/g, match => {
      console.log({ match });
      const [hasVar, varValue] = getVarValue(match, 'noComponent');
      return hasVar ? String(varValue) : match; // Substitui pelo valor real, ou mantém se não encontrado
    });
  };

  const arrStyles = arrGetValues.map(value => {
    console.log('ANTES DE AlTERADAS AS VARS', { value });
    value = replaceVarsInString(value);
    console.log('DEPOIS DE AlTERADAS AS VARS', { value });

    // Garantir que value é uma string antes de chamar trim()
    if (typeof value !== 'string') {
      console.warn('Valor não é uma string, convertendo:', value);
      value = JSON.stringify(value); // Converte para string se for um objeto
    }

    const trimmedString = value.trim(); // Agora é seguro chamar trim()

    // Log para depuração
    console.log('STRING PARA JSON5:', trimmedString);

    // Tenta converter a string em objeto
    const parsedObject = JSON5.parse(trimmedString);

    console.log('OBJETO RESULTANTE:', parsedObject);

    return parsedObject; // Retorna o objeto processado
  });

  console.log('GET_VAR_VALUES', { arrStyles });

  const allStls = arrStyles.flatMap(style => {
    if (style.shadowOffset) return style;
    console.log('GET_VAR_VALUES', { style });

    const possibleValues = Object.keys(style);

    const setPx = (stlVal: any) => {
      const checkNum = typeof stlVal === 'number';
      const condVal = checkNum ? String(stlVal) + 'px' : stlVal;

      return condVal;
    };

    const result = possibleValues.flatMap(key => {
      const stlVal = style[key];

      const [condVar, varValue] = getVarValue(stlVal, 'noComponent');
      console.log('GET_VAR_VALUES', { varValue });

      if (!condVar) {
        const valToPx = String(setPx(stlVal));
        const process2 = getStylesForProperty(key, valToPx);
        console.log('GET_VAR_VALUES', { process2 });

        return process2;
      }

      const varToPx = String(setPx(varValue));
      const process3 = getStylesForProperty(key, varToPx, true);
      console.log('GET_VAR_VALUES', { process3 });

      return process3;
    });

    console.log('GET_VAR_VALUES', { result });
    return result as Style[];
    // return result;
  });

  console.log('GET_VAR_VALUES', { allStls });

  return allStls;
};
