
// ---------- import Packs
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

// ---------- import Local Tools
import { getStlValues, mapElements } from '../project';
import { useRoutes } from '../../..';

// ---------- Types
type Tprops = {
  pass: {
    pathScreen: string;
    styles: any;
    screenElements: any;
    functions: any;
    args: any;
  };
};

export const processFunctions = async (arr: any[]) => {
  for (const fn of arr) {
    if (typeof fn === 'function') {
      const result = await fn();
      return result || { trigger: '', arrFunctions: [] };
    }
  }
  return { trigger: '', arrFunctions: [] };
};

// Screen3 (newBase)
export const Screen3 = ({ pass }: Tprops) => {
  const { pathScreen } = pass;
  const currRoute = useRoutes(ct => ct.currRoute);
  const condShow = pathScreen === currRoute;

  return condShow ? <Screen3Render pass={pass} /> : null;
};

function Screen3Render({ pass }: Tprops) {
  const { styles, screenElements, functions, args } = pass;
  const [sttTypeFunc, setTypeFunc] = useState('on init');
  const [sttPressFuncs, setPressFuncs] = useState<Array<() => Promise<void>>>(
    [],
  );

  const callFn = async () => {
    const { trigger, arrFunctions } = await processFunctions(functions);
    setTypeFunc(trigger);
    setPressFuncs(arrFunctions);

    if (trigger === 'on init') {
      console.log('ON INIT >>>>>');
      for (const currFunc of arrFunctions) await currFunc();
    }
  };

  useEffect(() => {
    callFn();
  }, []);

  // ---------- set Variables Styles (If Exists)
  const stl = getStlValues(styles);

  // ---------- set Render
  if (!sttTypeFunc) return null;

  const onPressFunc = async () => {
    console.log('Clicou', sttPressFuncs);
    for (const currFunc of sttPressFuncs) await currFunc();
  };

  if (sttTypeFunc === 'on press') {
    return (
      <Pressable style={stl} onPress={onPressFunc}>
        {mapElements(screenElements, args)}
      </Pressable>
    );
  }

  if (sttTypeFunc === 'on init') {
    return <View style={stl}>{mapElements(screenElements, args)}</View>;
  }

  console.log({ sttTypeFunc });
  return <View style={stl}>{mapElements(screenElements, args)}</View>;
}
