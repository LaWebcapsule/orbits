import { ESLintUtils } from "@typescript-eslint/utils";
import * as typeUtils from "@typescript-eslint/type-utils";
import * as tsutils from 'ts-api-utils';
const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);
export const noAsyncRule = createRule({
    create(context) {
        const services = ESLintUtils.getParserServices(context);
        function isDefineMethod(node) {
            return (node.key.type === 'Identifier' &&
                node.key.name.startsWith('define'));
        }
        function isInActionClass(node) {
            let parent = node.parent;
            while (parent) {
                if (parent.type === 'ClassBody') {
                    const classNode = parent.parent;
                    if (classNode?.type === 'ClassDeclaration' &&
                        classNode.superClass?.type === 'Identifier' &&
                        classNode.superClass.name === 'Action') {
                        return true;
                    }
                }
                parent = parent.parent;
            }
            return false;
        }
        return {
            "MethodDefinition[key.name=/define*/] CallExpression"(node) {
                const services = ESLintUtils.getParserServices(context);
                const checker = services.program.getTypeChecker();
                const tsNode = services.esTreeNodeToTSNodeMap.get(node);
                const tsType = checker.getTypeAtLocation(tsNode);
                if (isPromiseLike(tsNode, tsType)) {
                    const symbol = tsType.getSymbol();
                    const name = checker.getFullyQualifiedName(symbol);
                    if (name !== "DoPromise") {
                        context.report({
                            messageId: 'noAwait',
                            node: node,
                        });
                    }
                }
                function isPromiseLike(node, type) {
                    //source code : cf : https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/type-utils/package.json
                    type ??= checker.getTypeAtLocation(node);
                    // we always consider the built-in Promise to be Promise-like...
                    const typeParts = tsutils.unionTypeParts(checker.getApparentType(type));
                    if (typeParts.some(typePart => typeUtils.isBuiltinSymbolLike(services.program, typePart, 'Promise'))) {
                        return true;
                    }
                    const result = tsutils.isThenableType(checker, node, type);
                    return result;
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Avoid looping over enums.",
        },
        messages: {
            noAwait: "Do not await except over this.do.",
        },
        type: "suggestion",
        schema: [],
    },
    name: "no-classic-await",
    defaultOptions: [],
});
