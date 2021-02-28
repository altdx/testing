# Altdx Testing Library

## Description

A lightweight module for performing tests and mocks with Deno.

## Usage

Create mock for `Deno.stdout.writeSync` method:

```typescript
const printText = (text: string) = {
  const encoder: TextEncoder = new TextEncoder();
  Deno.stdout.writeSync(encoder.encode(text));
}
```

```typescript
import { Mock } from "https://deno.land/x/altdx_testing/Mock/mod.ts";

Deno.test("Altdx testing - Should mock function be called", () => {
  const mock = new Mock();
  mock.spyOn(Deno.stdout, "writeSync");
  printText("Hello");
  assertEquals(true, mock.haveBeenCalled());
  mock.resetStdoutWriteSync();
});
```

## Documentation

#### Mock methods

```typescript
export interface IMock {
  resetStdoutWriteSync(): IMock;
  spyOn<T>(object: T, method: keyof T): IMock;
  willReturn(value: any): IMock;
  willAlwaysReturn(value: any): IMock;
  haveBeenCalled(): boolean;
  haveBeenCalledTimes(expected: number): boolean;
  haveBeenCalledWith<E extends any[]>(...args: E): boolean;
  haveBeenCalledTimesWith<E extends any[]>(
    expected: number,
    ...args: E
  ): boolean;
  haveBeenNthCalledWith<E extends any[]>(nthCall: number, ...args: E): boolean;
  haveBeenLastCalledWith<E extends any[]>(...args: E): boolean;
  haveLastReturnedWith<E = any>(expected: E): boolean;
  haveNthReturnedWith<E = any>(nthCall: number, expected: E): boolean;
  haveReturned(): boolean;
  haveReturnedTimes(expected: number): boolean;
  haveReturnedWith<E = any>(expected: E): boolean;
}
```

## License

The scripts and documentation in this project are released under the
[MIT license](./LICENSE).
