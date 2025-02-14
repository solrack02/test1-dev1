

          // ---------- import React Packs
          import React from 'react';
          import * as RN from 'react-native';

          // ---------- import Variables Pack
          import { create } from 'zustand';

          // ---------- import Local Tools
          import { mapElements } from './tools/base/project/mapElements';
          import * as functions from './tools/base/functions';
          import * as Elements from './tools/base/Elements';
          import { Project } from './tools/base/project';
          import * as jsvals from './tools/base/jsvals';
          import { props } from './tools/base/props';
          import * as customs from './tools/customs';
          import * as stls from './tools/base/stls';
          import { tools } from './tools';

          // ---------- set Caps Inputs
          const currRoute = 'sc1';

          let args: any = [];

          const screens = [
            
        

        (...args: any) => <Elements.Screen3 pass={{
          pathScreen:"sc1",

          styles:[
        { backgroundColor: "red", flex: 1 },, { backgroundColor: "green", alignItems: "center", justifyContent: "center" }],

          screenElements:[
        

          (...args:any) => <Elements.DynView pass={{
            elementsProperties:[{}],

            styles:[{ width: 50, height: 50, backgroundColor: "black" }],

            functions:[async (...args) =>
 functions.funcGroup({ args, pass:{
 arrFunctions: [
        (...args) => {
          // ---------- get Function from A_Project Scope
          return tools.goTo("sc2");
        }
        ]
 , trigger: 'on press'
}})],            childrenItems:[() =><></>],

            args,
          }}/>
        , 
        

          (...args:any) => <Elements.DynView pass={{
            elementsProperties:[{}],

            styles:[{ width: '100%', height: 250, backgroundColor: "red" }],

            functions:[()=>{}],            childrenItems:[

          (...args:any) => <Elements.DynView pass={{
            elementsProperties:[{}],

            styles:[{ width: 20, height: 400, backgroundColor: "grey" }],

            functions:[()=>{}],            childrenItems:[(...args:any) => <Elements.Text pass={{
          arrProps: [
            {}
          ],

          arrStyles: [
            { color: "darkgreen" }
          ],

          children: [
            'carlos'
          ],

          args,

        }}/>],

            args,
          }}/>
        ],

            args,
          }}/>
        , 

    (...args:any) => <Elements.ImageBox pass={{
      elementsProperties:[{}],

      styles:[{ width: '100%', height: 100 }],

      URIvariablePath:[https://images.unsplash.com/photo-1739193704276-01d202eed179?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D],

      args,
    }}/>],

          functions:[()=>{}],

          args,
        }}/>, 

        (...args: any) => <Elements.Screen3 pass={{
          pathScreen:"sc2",

          styles:[{ backgroundColor: "red", flex: 1}],

          screenElements:[() => {
                  const textStyle = {
                    fontSize: 20,
                    color: '#fff2',
                    textAlign:'center',
                    maxWidth: 200,
                    // maxWidth: '200px'<= #ATTENTION: Native ERROR! No string!
                  };

                  return (
                    <RN.Text style={textStyle}>
                      {'Adicione Elementos nessa tela!'}
                    </RN.Text>);
                }],

          functions:[()=>{}],

          args,
        }}/>
          ];

          const initCt = () => ({
            true: "true"
          });
          const initObj = initCt();
          // console.log(initObj);

          const arrInitFuncs = [
            ()=>{}
          ];

          export const useRoutes = create(() => ({ currRoute }));
          export const useData = create(() => initObj);

          // ---------- set Main Component
          export const Router = () => {
            return (
              <Project
                configData={{
                  screens,
                  initCt,
                  arrInitFuncs,
                }}
              />
            );
          };
        
