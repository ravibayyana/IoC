# IoC

Sample IoC to inject dependencies via Propertry injectors and class Injectors.

# Container 

This is used to register and resolve object with keys. Test cases at location .\tests\container.test.ts

```typescript
 Container.register(key, new SampleClass());
 Container.resolve(key); // resolves object registered with key above
 Container.clean();// deletes all registered objects with the container
 Container.unRegister(key); // deletes corresponding object with the key 
```

# Class Injector[@classInjector]
The below code will create a new SampleClass and register in the Container with key specified in @classInjector(key). Test cases at location .\tests\classInjector.test.ts

```typescript
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
  ```
  
 To retrieve the object from the container we use following code 
  
  ```typescript
   Container.resolve(key)
  ```
 
 # Property Injector [@propertyInjector]
 
 Used to inject objects via properties already registered in the Container. Test cases at location .\tests\propertyinjector.test.ts
 
 ```typescript
 
  Container.register("classId", new SampleMyClass());
  
 class Sample {
      @propertyInjector("classId")
      public myClass!: SampleMyClass;

      public getSampleClassId(): string {
        return this.myClass.id;
      }
    }
 ```
 
 
