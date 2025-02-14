
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

// Screen3 (newBase)
export const Screen3 = ({ pass }: Tprops) => {
  const { pathScreen } = pass;
  const currRoute = useRoutes(ct => ct.currRoute);
  const condShow = pathScreen === currRoute;

  return condShow ? <Screen3Render pass={pass} /> : null;
};

function Screen3Render({ pass }: Tprops) {
  const { styles, screenElements, functions, args } = pass;
  const [sttTypeFunc, setTypeFunc] = useState('');
  const [sttPressFuncs, setPressFuncs] = useState<Array<() => Promise<void>>>(
    [],
  );

  useEffect(() => {
    const callFn = async () => {
      const { trigger, arrFunctions } = await processFunctions(functions);
      setTypeFunc(trigger);
      setPressFuncs(arrFunctions);

      console.log('ON INIT >>>>>');
      // if (trigger === 'on init') {
      //   for (const currFunc of arrFunctions) await currFunc();
      // }
    };

    console.log('dentro EFFECT', sttTypeFunc, sttPressFuncs);
    callFn();
  }, []);

  console.log('FORA EFFECT', sttTypeFunc, sttPressFuncs);

  // ---------- set Variables Styles (If Exists)
  const stl = getStlValues(styles);

  // ---------- set Render
  if (!sttTypeFunc) return null;

  return sttTypeFunc === 'on press' ? (
    <Pressable
      style={stl}
      onPress={async () => {
        console.log('Clicou', sttPressFuncs);
        for (const currFunc of sttPressFuncs) await currFunc();
      }}
    >
      {mapElements(screenElements, args)}
    </Pressable>
  ) : (
    <View style={stl}>{mapElements(screenElements, args)}</View>
  );
}

export const processFunctions = async (arr: any[]) => {
  for (const fn of arr) {
    if (typeof fn === 'function') {
      const result = await fn();
      return result || { trigger: '', arrFunctions: [] };
    }
  }
  return { trigger: '', arrFunctions: [] };
};
