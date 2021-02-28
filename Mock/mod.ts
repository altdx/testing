export * from "./Mock.ts";

export interface IMock {
  /**
   * Re-set Deno stdout writeSync method.
   */
  resetStdoutWriteSync(): IMock;

  /**
   * Creates a mock function.
   *
   * @param object - Object that contains the method to mock.
   * @param method - Method to mock.
   * @returns The current Mock instance (fluent).
   */
  spyOn<T>(object: T, method: keyof T): IMock;

  /**
   * Accepts a value that will be returned whenever the mock function is called.
   *
   * @param value - Value that will be returned.
   * @returns The current Mock instance (fluent).
   */
  willReturn(value: any): IMock;

  /**
   * Accepts a value that will always be returned whenever the mock function is called.
   *
   * @param value - Value that will always be returned.
   * @returns The current Mock instance (fluent).
   */
  willAlwaysReturn(value: any): IMock;

  /**
   * Ensures that a mock function is called.
   */
  haveBeenCalled(): boolean;

  /**
   * Ensures that a mock function is called an exact number of times.
   */
  haveBeenCalledTimes(expected: number): boolean;

  /**
   * Ensure that a mock function is called with specific arguments.
   *
   * Optionally, you can provide a type for the expected arguments via a generic.
   * Note that the type must be either an array or a tuple.
   */
  haveBeenCalledWith<E extends any[]>(...args: E): boolean;

  /**
   * Combination of haveBeenCalledTimes and haveBeenCalledWith
   */
  haveBeenCalledTimesWith<E extends any[]>(
    expected: number,
    ...args: E
  ): boolean;

  /**
   * Ensure that a mock function is called with specific arguments on an Nth call.
   *
   * Optionally, you can provide a type for the expected arguments via a generic.
   * Note that the type must be either an array or a tuple.
   */
  haveBeenNthCalledWith<E extends any[]>(nthCall: number, ...args: E): boolean;

  /**
   * If you have a mock function, you can use `.haveBeenLastCalledWith`
   * to test what arguments it was last called with.
   *
   * Optionally, you can provide a type for the expected arguments via a generic.
   * Note that the type must be either an array or a tuple.
   */
  haveBeenLastCalledWith<E extends any[]>(...args: E): boolean;

  /**
   * Use to test the specific value that a mock function last returned.
   * If the last call to the mock function threw an error, then this matcher will fail
   * no matter what value you provided as the expected return value.
   *
   * Optionally, you can provide a type for the expected value via a generic.
   * This is particularly useful for ensuring expected objects have the right structure.
   */
  haveLastReturnedWith<E = any>(expected: E): boolean;

  /**
   * Use to test the specific value that a mock function returned for the nth call.
   * If the nth call to the mock function threw an error, then this matcher will fail
   * no matter what value you provided as the expected return value.
   *
   * Optionally, you can provide a type for the expected value via a generic.
   * This is particularly useful for ensuring expected objects have the right structure.
   */
  haveNthReturnedWith<E = any>(nthCall: number, expected: E): boolean;

  /**
   * Use to test that the mock function successfully returned (i.e., did not throw an error) at least one time
   */
  haveReturned(): boolean;

  /**
   * Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
   * Any calls to the mock function that throw an error are not counted toward the number of times the function returned.
   */
  haveReturnedTimes(expected: number): boolean;

  /**
   * Use to ensure that a mock function returned a specific value.
   *
   * Optionally, you can provide a type for the expected value via a generic.
   * This is particularly useful for ensuring expected objects have the right structure.
   */
  haveReturnedWith<E = any>(expected: E): boolean;
}

export interface IMockCallInfo {
  /**
   * All arguments passed to the call
   */
  args: any[];
  /**
   * The return value of the call
   */
  returnValue: any;
}
