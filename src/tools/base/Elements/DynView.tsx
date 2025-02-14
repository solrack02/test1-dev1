
// ---------- import Packs
import React from 'react';

type Tprops = {
  pass: {
    elementsProperties: any;
    styles: any;
    functions: any[];
    childrenItems: any;
    args: any;
  };
};

// DynView / BOX
export const DynView = (props: Tprops) => {
  console.log('BOX', { props });

  return <></>;
};
