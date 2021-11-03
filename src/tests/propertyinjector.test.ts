import { nanoid } from "nanoid";
import { classInjector, propertyInjector } from "../ioc-injectors";
import { Container } from "../container";

let classId: string = nanoid();
let arg1 = "one";

describe("Property Injector Tests", () => {
  beforeEach(() => Container.clear());

  test("Register object using property injector ", () => {
    @classInjector(classId, arg1)
    class SampleMyClass {
      public id: string;

      constructor(id: string) {
        this.id = id;
      }

      public print() {
        console.log("in sampleClass with id:" + this.id);
      }
    }

    class Sample {
      @propertyInjector(classId)
      public myClass!: SampleMyClass;

      public getSampleClassId(): string {
        return this.myClass.id;
      }
    }

    let sample = new Sample();
    expect(sample.getSampleClassId() === arg1).toBeTruthy();
  });

  test("Register object with invalid type property injector ", () => {
    @classInjector(classId, arg1)
    class SampleMyClass {
      public id: string;

      constructor(id: string) {
        this.id = id;
      }

      public print() {
        console.log("in sampleClass with id:" + this.id);
      }
    }

    //Dummy class
    class SampleMyClass1 {}

    class Sample {
      @propertyInjector(classId)
      public myClass!: SampleMyClass1;
    }

    let sample = new Sample();
    expect(() => sample.myClass).toThrowError();
  });
});
