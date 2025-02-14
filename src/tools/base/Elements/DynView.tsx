
// ---------- import Packs
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

// ---------- import Local Tools
import { argSel, getStlValues, mapElements, pathSel } from '../project';
import { useData } from '../../..';

export const css =
  'color: lightblue; background-color: black; font-size: 11px; padding: 2px 6px; border-radius: 3px';

type Tprops = {
  pass: {
    elementsProperties: any;
    styles: any;
    functions: any[];
    childrenItems: any;
    args: any;
  };
};

export const processFunctions = async (arr: any[]) => {
  const defaultVal = { trigger: '', arrFunctions: [] };

  for (const fn of arr) {
    if (typeof fn === 'function') {
      const result = await fn();
      return result || defaultVal;
    }
  }

  return defaultVal;
};

// DynView / BOX
export const DynView = (props: Tprops) => {
  console.log('BOX', { props });

  const [sttTypeFunc, setTypeFunc] = useState('');
  const [sttPressFuncs, setPressFuncs] = useState<
    Array<(args: any) => Promise<void>>
  >([]);

  // ---------- set Props
  const { elementsProperties, styles, functions } = props.pass;
  const { childrenItems, args } = props.pass;

  const callFn = async () => {
    const { trigger, arrFunctions } = await processFunctions(functions);
    setTypeFunc(trigger);
    setPressFuncs(arrFunctions);

    // ------- set Init Functions (Capsules)
    if (trigger === 'on init') {
      for (const currFunc of arrFunctions) await currFunc(args);
    }
  };

  useEffect(() => {
    callFn();
  }, []);

  // ---------- set Variables Styles (If Exists)
  const stl = getStlValues(styles);

  // ------- set User Element Properties (If Exists)
  const userElProps: any = {};

  for (const object of elementsProperties) {
    for (const keyProp in object) {
      const valueProp = object[keyProp];
      userElProps[keyProp] = valueProp;
    }
  }

  const allProps = {
    style: stl,
    children: mapElements(childrenItems, args),
    ...userElProps,
  };

  // ---------- set Render
  if (!sttTypeFunc) return <View {...allProps} />;

  if (sttTypeFunc === 'on press') {
    allProps.onPress = async () => {
      for (const currFunc of sttPressFuncs) await currFunc(args);
    };

    return <Pressable {...allProps} />;
  }

  if (sttTypeFunc === 'on init') return <View {...allProps} />;
};
