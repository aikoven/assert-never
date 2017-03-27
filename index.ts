/**
 * Helper function for exhaustive checks of discriminated unions.
 * https://basarat.gitbooks.io/typescript/docs/types/discriminated-unions.html
 *
 * @example
 * <pre><code>
 * type A = {type: 'a'};
 * type B = {type: 'b'};
 * type Union = A | B;
 *
 * function doSomething(arg: Union) {
 *   if (arg.type === 'a') {
 *     return something;
 *   }
 *
 *   if (arg.type === 'b') {
 *     return somethingElse;
 *   }
 *
 *   // TS will error if there are other types in the union
 *   return assertNever(arg);
 * }
 * </code></pre>
 */
export default function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
}