
// ---------- import Packs
import React from 'react';
import { Text, View } from 'react-native';

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

  const processFunctions = async arr => {
    for (const fn of arr) {
      if (typeof fn === 'function') {
        const result = await fn(); // Executa a função assíncrona

        if (result?.pass?.trigger) {
          console.log('Trigger:', result.pass.trigger);
        }
      }
    }
  };

  const xxx = processFunctions(functions);
  console.log({ xxx });

  // ---------- call Functions (If Exists)
  React.useEffect(() => {
    const callFn = async () => {
      console.log({ functions });
      for (const currFunc of functions) await currFunc();
    };
    callFn().catch(err => console.log({ err }));
  }, []);

  // ---------- set Variables Styles (If Exists)
  console.log('AQUI 2', { styles });
  const stl = getStlValues(styles);
  console.log('AQUI 3', { stl });

  // ---------- set Render
  return <View style={[stl]}>{mapElements(screenElements, args)}</View>;
}

