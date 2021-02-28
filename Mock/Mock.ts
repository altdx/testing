import { IMock, IMockCallInfo } from "./mod.ts";

/**
 * Spy Class description
 */
export class Mock implements IMock {
  protected returnValues: any[] = [];
  protected alwaysReturnValue: any = undefined;
  protected calls: IMockCallInfo[] = [];
  protected stdoutWriteSync = Deno.stdout.writeSync;

  protected mockFn(...args: any): void {
    let rValue = this.alwaysReturnValue;

    if (this.returnValues[this.calls.length] !== undefined) {
      rValue = this.returnValues[this.calls.length];
    }

    this.calls.push({
      args,
      returnValue: rValue,
    });

    return;
  }

  /**
   * @inheritDoc IMock.spyOn
   */
  public spyOn<T>(object: T, method: keyof T): IMock {
    // @ts-ignore
    object[method] = this.mockFn.bind(this);

    return this;
  }

  /**
   * @inheritDoc IMock.resetStdoutWriteSync
   */
  public resetStdoutWriteSync(): Mock {
    Deno.stdout.writeSync = this.stdoutWriteSync;

    return this;
  }

  /**
   * @inheritDoc IMock.haveBeenCalled
   */
  public haveBeenCalled(): boolean {
    return this.calls.length > 0;
  }

  /**
   * @inheritDoc IMock.willReturn
   */
  public willReturn(value: any): IMock {
    this.returnValues.push(value);

    return this;
  }

  /**
   * @inheritDoc IMock.willAlwaysReturn
   */
  public willAlwaysReturn(value: any): IMock {
    this.alwaysReturnValue = value;

    return this;
  }

  /**
   * @inheritDoc IMock.haveBeenCalledTimes
   */
  public haveBeenCalledTimes(expected: number): boolean {
    return this.calls.length === expected;
  }

  /**
   * @inheritDoc IMock.haveBeenCalledWith
   */
  public haveBeenCalledWith<E extends any[]>(...args: E): boolean {
    const call: IMockCallInfo = this.calls[this.calls.length - 1];
    if (call === undefined) {
      return false;
    }

    return JSON.stringify(call.args) === JSON.stringify(args);
  }

  /**
   * @inheritDoc IMock.haveBeenCalledTimesWith
   */
  public haveBeenCalledTimesWith<E extends any[]>(
    expected: number,
    ...args: E
  ): boolean {
    if (!this.haveBeenCalledTimes(expected)) {
      return false;
    }

    for (let i = 0; i < this.calls.length; i++) {
      if (JSON.stringify(this.calls[i].args) !== JSON.stringify(args)) {
        return false;
      }
    }

    return true;
  }

  /**
   * @inheritDoc IMock.haveBeenNthCalledWith
   */
  public haveBeenNthCalledWith<E extends any[]>(
    nthCall: number,
    ...args: E
  ): boolean {
    if (this.calls[nthCall - 1] === undefined) {
      return false;
    }

    return JSON.stringify(this.calls[nthCall - 1].args) ===
      JSON.stringify(args);
  }

  /**
   * @inheritDoc IMock.haveBeenLastCalledWith
   */
  public haveBeenLastCalledWith<E extends any[]>(...args: E): boolean {
    return this.haveBeenNthCalledWith(this.calls.length, ...args);
  }

  /**
   * @inheritDoc IMock.haveNthReturnedWith
   */
  public haveNthReturnedWith<E = any>(nthCall: number, expected: E): boolean {
    if (this.calls[nthCall - 1] === undefined) {
      return false;
    }

    return JSON.stringify(this.calls[nthCall - 1].returnValue) ===
      JSON.stringify(expected);
  }

  /**
   * @inheritDoc IMock.haveReturnedWith
   */
  public haveReturnedWith<E = any>(expected: E): boolean {
    const call: IMockCallInfo = this.calls[this.calls.length - 1];
    if (call === undefined) {
      return expected === undefined;
    }

    return call.returnValue === expected;
  }

  /**
   * @inheritDoc IMock.haveLastReturnedWith
   */
  public haveLastReturnedWith<E = any>(expected: E): boolean {
    return this.haveNthReturnedWith(this.calls.length, expected);
  }

  /**
   * @inheritDoc IMock.haveReturnedTimes
   */
  haveReturnedTimes(expected: number): boolean {
    if (this.calls.length === 0) {
      return false;
    }

    let times = 0;

    this.calls.map((call) => {
      if (call.returnValue !== undefined) {
        times++;
      }
    });

    return times === expected;
  }

  /**
   * @inheritDoc IMock.haveReturned
   */
  haveReturned(): boolean {
    for (let i = 0; i < this.calls.length; i++) {
      console.warn(this.calls[i].returnValue);
      if (this.calls[i].returnValue !== undefined) {
        return true;
      }
    }

    return false;
  }
}
