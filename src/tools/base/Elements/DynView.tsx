
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

  return <></>;
};
