import * as test from 'node:test';
import { RuleTester } from '@typescript-eslint/rule-tester';
import {noDoRule} from './no-dopromise-outside-define.js';

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

ruleTester.run('my-rule', noDoRule, {
  valid: [
    // valid tests can be a raw string,
    `
      export class DoPromise extends Promise{}

      const z = ()=>{
        return new Promise();
      }
      export class ChildAction extends Action{
          xyz(){
            const result = await z();
          }      
      }
    `
  ],
  invalid: [
    // invalid tests must always be an object
    {
      code: `
      export class DoPromise{
      }

      const z = ()=>{
        return new DoPromise();
      }
      export class ChildAction extends Action{
          xyz(){
            const result = z();
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