import { nanoid } from "nanoid";
import { classInjector } from "../injector-lib";
import { Container } from "../container";

describe("Class Injector Tests", () => {
  beforeEach(() => Container.clear());

  test("Register object using class injector", () => {
    let key: string = nanoid();
    @classInjector(key)
    class SampleClass {
      public print() {
        console.log("in sample class");
      }
    }

    let sampleClass = Container.resolve(key);
    expect("print" in sampleClass).toBeTruthy();
    expect(() => sampleClass.print()).not.toThrowError();
  });

  test("Without class injector no object is registered in the container", () => {
    let key: string = nanoid();
    class SampleClass {
      public print() {
        console.log("in sample class");
      }
    }
    expect(() => Container.resolve(key)).toThrowError();
  });

  test("Register object using class injector with custom constructor", () => {
    let key: string = nanoid();

    @classInjector(key, "one", "two")
    class SampleClass {
      public arg1: string;
      public arg2: string;

      constructor(arg1: string, arg2: string) {
        this.arg1 = arg1;
        this.arg2 = arg2;
      }

      public getArg1(): string {
        return this.arg1;
      }

      public getArg2(): string {
        return this.arg2;
      }
    }

    let sampleClass = Container.resolve(key);
    expect("getArg1" in sampleClass).toBeTruthy();
    expect("getArg2" in sampleClass).toBeTruthy();

    expect(sampleClass.getArg1()).toBe("one");
    expect(sampleClass.getArg2()).toBe("two");
  });

  test("Throw error on invalid number of constructor args", () => {
    let key: string = nanoid();
    expect(() => {
      @classInjector(key, "one")
      class SampleClass {
        public arg1: string;
        public arg2: string;

        constructor(arg1: string, arg2: string) {
          this.arg1 = arg1;
          this.arg2 = arg2;
        }

        public getArg1(): string {
          return this.arg1;
        }

        public getArg2(): string {
          return this.arg2;
        }
      }
    }).toThrowError();

    expect(() => {
      @classInjector(key)
      class SampleClass {
        public arg1: string;
        public arg2: string;

        constructor(arg1: string, arg2: string) {
          this.arg1 = arg1;
          this.arg2 = arg2;
        }

        public getArg1(): string {
          return this.arg1;
        }

        public getArg2(): string {
          return this.arg2;
        }
      }
    }).toThrowError();
  });
});
