import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
    name => `https://example.com/rule/${name}`,
);
  
export const noDoRule = createRule({
  create(context) {
    const services = ESLintUtils.getParserServices(context);

    function isDefineMethod(node: TSESTree.MethodDefinition) {
        return (
            node.key.type === 'Identifier' &&
            node.key.name.startsWith('define')
        );
    }  
  
    function isInActionClass(node: TSESTree.MethodDefinition): boolean {
        let parent = node.parent;
        while (parent) {
            if (parent.type === 'ClassBody') {
                const classNode = parent.parent;
                if (
                    classNode?.type === 'ClassDeclaration' &&
                    classNode.superClass?.type === 'Identifier' &&
                    classNode.superClass.name === 'Action'
                ) {
                    return true;
                }
            }
            parent = (parent as any).parent;
        }
        return false;
    }
  
  

    return {
      "MethodDefinition[key.name!=/define*/] CallExpression"(node: TSESTree.CallExpression){

        const services = ESLintUtils.getParserServices(context);
        const checker = services.program.getTypeChecker();
        const tsNode = services.esTreeNodeToTSNodeMap.get(node)
        const tsType = checker.getTypeAtLocation(tsNode)
        const symbol = tsType.getSymbol();
        const signature = checker.getResolvedSignature(tsNode);
        const returnType = checker.getReturnTypeOfSignature(signature!);
        if (symbol) {
          const returnTypeName = checker.getFullyQualifiedName(symbol);
          if(returnTypeName === "DoPromise" || returnTypeName.includes(".DoPromise")){
            context.report({
              messageId: 'noAwait',
              node: node,
            }) 
          }
        }
      }
    }
  },
  meta: {
    docs: {
      description: "Avoid looping over enums.",
    },
    messages: {
      noAwait: "Do not use do outside a method prefixed with define.",
    },
    type: "suggestion",
    schema: [],
  },
  name: "no-do-outside-def",
  defaultOptions: [],
});