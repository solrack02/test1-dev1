
// ---------- import Packs
import React from 'react';
import { Pressable, Text, View } from 'react-native';

// ---------- import Local Tools
import { getStlValues, mapElements } from '../project';
import { useRoutes } from '../../..';

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
export const Screen3 = (props: Tprops) => {
  const { pathScreen } = props.pass;
  const currRoute = useRoutes(ct => ct.currRoute);
  const condShow = pathScreen === currRoute;

  return <>{condShow && <Screen3Render pass={props.pass} />}</>;
};

function Screen3Render(props: Tprops) {
  const { styles, screenElements, functions, args } = props.pass;
  const [sttTypeFunc, setTypeFunc] = React.useState('');
  const [sttPressFuncs, setPressFuncs] = React.useState([async () => {}]);

  // ---------- call Functions (If Exists)
  React.useEffect(() => {
    const callFn = async () => {
      const processFunctions = async arr => {
        for (const fn of arr) {
          if (typeof fn === 'function') return await fn();
        }
      };
      const { trigger, arrFunctions } = await processFunctions(functions);
      setTypeFunc(trigger);
      console.log({ trigger, arrFunctions });

      if (trigger === 'on press') setPressFuncs(arrFunctions);
      if (trigger === 'on init') {
        console.log({ arrFunctions });
        for (const currFunc of arrFunctions) await currFunc();
      }
    };

    callFn().catch(err => console.log({ err }));
  }, []);

  // ---------- set Variables Styles (If Exists)
  console.log('AQUI 2', { styles });
  const stl = getStlValues(styles);
  console.log('AQUI 3', { stl });

  // ---------- set Render
  return sttTypeFunc ? (
    <View style={[stl]}>{mapElements(screenElements, args)}</View>
  ) : (
    <Pressable
      style={[stl]}
      onPress={async () => {
        for (const currFunc of sttPressFuncs) await currFunc();
      }}
    >
      {mapElements(screenElements, args)}
    </Pressable>
  );
}
