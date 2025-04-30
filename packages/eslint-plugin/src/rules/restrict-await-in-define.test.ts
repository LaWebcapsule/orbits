import * as test from 'node:test';
import { RuleTester } from '@typescript-eslint/rule-tester';
import {noAsyncRule} from './restrict-await-in-define.js';

RuleTester.afterAll = test.after;
RuleTester.describe = test.describe;
RuleTester.it = test.it;
RuleTester.itOnly = test.it.only;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.ts*'],
      },
      tsconfigRootDir: __dirname,
    },
  },
});

ruleTester.run('my-rule', noAsyncRule, {
  valid: [
    // valid tests can be a raw string,
    `
      export class ChildAction extends Action{
          define(){
            const result = await this.do("xyz", "");
          }
      
      }
    `,

    // you can enable JSX parsing by passing parserOptions.ecmaFeatures.jsx = true
    `
      export class ChildAction extends Action{
          defineXYZ(){
            const result = await this.do("xyz", "");
          }
      
      }
    `,
    `
    export class ActionPromise extends Promise{
    }

    function z(){
      return new ActionPromise()
    }


    export class ChildAction extends Action{
        defineXYZ(){
          const result = await z();
        }
    
    }
  `
  ],
  invalid: [
    // invalid tests must always be an object
    {
      code: `

      function z(){
        return Promise.resolve();
      }

      export class ChildAction extends Action{
          defineXYZ(){
            const result = await z();
          }
      
      }
    `,
      // invalid tests must always specify the expected errors
      errors: [
        {
          messageId: 'noAwait'
        },
      ],
    }
  ],
});