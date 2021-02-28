import { Mock } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";

const encoder: TextEncoder = new TextEncoder();

Deno.test("Altdx testing - Should mock function be called", () => {
  const mock = new Mock();
  mock.spyOn(Deno.stdout, "writeSync");
  Deno.stdout.writeSync(encoder.encode("Hello"));
  assertEquals(true, mock.haveBeenCalled());
  mock.resetStdoutWriteSync();
});

Deno.test("Altdx testing - Should set return value", () => {
  const mock = new Mock();
  mock.spyOn(Deno.stdout, "writeSync").willReturn("my value 1").willReturn(
    "my value 2",
  );

  assertEquals(true, mock.haveReturnedWith(undefined));
  assertEquals(false, mock.haveReturnedWith("my value"));

  Deno.stdout.writeSync(encoder.encode("Hello"));
  assertEquals(true, mock.haveReturnedWith("my value 1"));
  assertEquals(false, mock.haveReturnedWith("my value 2"));

  Deno.stdout.writeSync(encoder.encode("Hello"));
  assertEquals(true, mock.haveReturnedWith("my value 2"));
  assertEquals(false, mock.haveReturnedWith("my value 1"));

  Deno.stdout.writeSync(encoder.encode("Hello"));
  assertEquals(true, mock.haveReturnedWith(undefined));

  mock.willAlwaysReturn("always value");
  Deno.stdout.writeSync(encoder.encode("Hello"));
  assertEquals(true, mock.haveReturnedWith("always value"));

  mock.resetStdoutWriteSync();
});

Deno.test("Altdx testing - Should be have called times", () => {
  const mock = new Mock();
  mock.spyOn(console, "log");
  console.log("hello");
  assertEquals(true, mock.haveBeenCalledTimes(1));
  assertEquals(false, mock.haveBeenCalledTimes(0));
  assertEquals(false, mock.haveBeenCalledTimes(2));
  console.log("hello");
  console.log("hello");
  assertEquals(true, mock.haveBeenCalledTimes(3));
});

Deno.test("Altdx testing - Should be have called with", () => {
  const mock = new Mock();
  mock.spyOn(console, "log");
  assertEquals(false, mock.haveBeenCalledWith("hello"));
  console.log("hello");
  assertEquals(true, mock.haveBeenCalledWith("hello"));
  console.log("john", "doe");
  assertEquals(true, mock.haveBeenCalledWith("john", "doe"));
});

Deno.test("Altdx testing - Should be have called times with", () => {
  const mock = new Mock();
  mock.spyOn(console, "log");
  assertEquals(false, mock.haveBeenCalledTimesWith(1, "hello"));
  assertEquals(true, mock.haveBeenCalledTimesWith(0, "hello"));
  console.log("john", "doe");
  console.log("john", "doe");
  assertEquals(false, mock.haveBeenCalledTimesWith(1, "john", "doe"));
  assertEquals(true, mock.haveBeenCalledTimesWith(2, "john", "doe"));
  assertEquals(false, mock.haveBeenCalledTimesWith(2, "john"));
});

Deno.test("Altdx testing - Should be have nth called with", () => {
  const mock = new Mock();
  mock.spyOn(console, "log");
  assertEquals(false, mock.haveBeenNthCalledWith(1, "john"));
  assertEquals(false, mock.haveBeenNthCalledWith(0, "john"));
  console.log("john", "doe");
  assertEquals(false, mock.haveBeenNthCalledWith(1, "john"));
  assertEquals(false, mock.haveBeenNthCalledWith(1, "doe"));
  assertEquals(true, mock.haveBeenNthCalledWith(1, "john", "doe"));
  console.log("john");
  assertEquals(false, mock.haveBeenNthCalledWith(2, "john", "doe"));
  assertEquals(false, mock.haveBeenNthCalledWith(2, "doe"));
  assertEquals(true, mock.haveBeenNthCalledWith(2, "john"));
});

Deno.test("Altdx testing - Should be have last called with", () => {
  const mock = new Mock();
  mock.spyOn(console, "log");
  assertEquals(false, mock.haveBeenLastCalledWith("john", "doe"));
  console.log("john", "doe");
  assertEquals(true, mock.haveBeenLastCalledWith("john", "doe"));
  console.log("john");
  console.log("doe");
  assertEquals(false, mock.haveBeenLastCalledWith("john"));
  assertEquals(true, mock.haveBeenLastCalledWith("doe"));
});

Deno.test("Altdx testing - Should be have nth returned with", () => {
  const mock = new Mock();
  mock.spyOn(console, "log");
  assertEquals(false, mock.haveNthReturnedWith(1, "john"));
  assertEquals(false, mock.haveNthReturnedWith(0, "john"));
  mock.willReturn(["yes", "no"]);
  console.log("john", "doe");
  assertEquals(false, mock.haveNthReturnedWith(1, undefined));
  assertEquals(true, mock.haveNthReturnedWith(1, ["yes", "no"]));
  mock.willReturn("alpha");
  console.log("john", "doe");
  assertEquals(false, mock.haveNthReturnedWith(2, undefined));
  assertEquals(true, mock.haveNthReturnedWith(2, "alpha"));
});

Deno.test("Altdx testing - Should be have last returned with", () => {
  const mock = new Mock();
  mock.spyOn(console, "log");
  assertEquals(false, mock.haveLastReturnedWith("john"));
  mock.willReturn(45);
  assertEquals(false, mock.haveLastReturnedWith(45));
  console.log("yes");
  assertEquals(true, mock.haveLastReturnedWith(45));
});

Deno.test("Altdx testing - Should be have returned times", () => {
  const mock = new Mock();
  mock.spyOn(console, "log");
  assertEquals(false, mock.haveReturnedTimes(1));
  mock.willReturn(10).willReturn(11).willReturn(12);
  console.log("hello");
  console.log("welcome");
  assertEquals(false, mock.haveReturnedTimes(0));
  assertEquals(false, mock.haveReturnedTimes(3));
  assertEquals(true, mock.haveReturnedTimes(2));
  console.log("welcome again");
  assertEquals(false, mock.haveReturnedTimes(2));
  assertEquals(true, mock.haveReturnedTimes(3));
});

Deno.test("Altdx testing - Should be have returned", () => {
  const mock = new Mock();
  mock.spyOn(console, "log");
  assertEquals(false, mock.haveReturned());
  console.log("hello");
  assertEquals(false, mock.haveReturned());
  mock.willReturn("no").willReturn("yes");
  console.log("John");
  assertEquals(true, mock.haveReturned());
});
