
// ---------- import Local Tools
import { getVarValue } from './getVarValue';

// ---------- import Packs
import { Style, getStylesForProperty } from 'css-to-react-native';

// ----------- set Style Variable Selection
export const getStlValues = (arrGetValues: string[]) => {
  console.log('GET_VAR_VALUES', { arrGetValues });

  const parseObject = (argStr: any) => {
    const parseObj = JSON.parse(argStr);

    console.log('GET_VAR_VALUES', { arrGetValues });

    return parseObj;
  };
  //   console.log('GET_VAR_VALUES', { parseObject });
  const arrStyles = arrGetValues.map(string => parseObject(string));
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
