import { Container } from "../container";
import { nanoid } from "nanoid";

describe("Container Tests", () => {
  class SampleClass {
    public id: string;
    constructor(id: string) {
      this.id = id;
    }
  }

  beforeEach(() => {
    Container.clear();
  });

  test("Register and Resolve a new object", () => {
    let key = "class1";
    let id = nanoid();
    Container.register(key, new SampleClass(id));
    let sampleClass = Container.resolve(key);
    expect(sampleClass.id === id).toBeTruthy();
  });

  test("Throw error on Registering object with same key more than once", () => {
    let key = "class1";

    expect(() =>
      Container.register(key, new SampleClass(nanoid()))
    ).not.toThrowError();

    expect(() =>
      Container.register(key, new SampleClass(nanoid()))
    ).toThrowError();
  });

  test("Registering two object of same type with different ids", () => {
    let key1 = nanoid();
    let key2 = nanoid();

    let id1 = nanoid();
    let id2 = nanoid();

    Container.register(key1, new SampleClass(id1));
    Container.register(key2, new SampleClass(id2));

    expect(
      () =>
        Container.resolve(key1).id === id1 && Container.resolve(key2).id === id2
    ).toBeTruthy();
  });

  test("Resolving an ungeristered key throws an error", () => {
    expect(() => Container.resolve(nanoid())).toThrowError();
  });

  test("Clear container and  on resolving an ungeristered key throws exception", () => {
    Container.register(nanoid(), new SampleClass(nanoid()));
    Container.clear();
    expect(() => Container.resolve(nanoid())).toThrowError();
  });

  test("Unregister an unknown key throws exception", () => {
    expect(() => Container.unRegister(nanoid())).toThrowError();
  });

  test("Unregister an registered key does not throws exception", () => {
    let key1 = nanoid();

    Container.register(key1, new SampleClass(nanoid()));
    expect(() => Container.unRegister(key1)).not.toThrowError();
  });
});
