import "reflect-metadata";
import { Container } from "./container";

export function propertyInjector(key: string) {
  return function (target: any, propertyKey: string) {
    let descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    if (!descriptor) {
      Object.defineProperty(target, propertyKey, {
        get: () => {
          var type = Reflect.getMetadata("design:type", target, propertyKey);
          let value = Container.resolve(key);
          if (!(value instanceof type)) {
            throw new Error(
              `DI: Property Injector Error. Property: ${propertyKey}, Key:${key} with invalid type, expecting type: ${type.name}.`
            );
          }

          return value;
        },
        // set: (value: any) => {
        //   let type = Reflect.getMetadata("design:type", target, propertyKey);

        //   if (!(value instanceof type)) {
        //     throw new TypeError(
        //       `Invalid type, got ${typeof value} not ${type.name}.`
        //     );
        //   }
        //   Container.register(key, value);
        //   return value;
        // },
      });
      return;
    }

    // descriptor.get = () => Container.resolve(key);
    // descriptor.set = (value: any) => value;
  };
}
// export function accessorInjector(key: string) {
//   return function accessorInjector<T>(
//     target: any,
//     propertyKey: string,
//     descriptor: TypedPropertyDescriptor<T>
//   ) {
//     let set = descriptor.set!;

//     descriptor.set = function (value: T) {
//       let type = Reflect.getMetadata("design:type", target, propertyKey);

//       if (!(value instanceof type)) {
//         throw new TypeError(
//           `Invalid type, got ${typeof value} not ${type.name}.`
//         );
//       }

//       set.call(this, value);
//     };
//   };
// }

export function classInjector(key: string, ...args1: any[]): Function {
  return function (target: { new (...args: any[]): {} }): void {
    var paramtypes = Reflect.getMetadata("design:paramtypes", target);

    if (paramtypes && paramtypes.length !== args1.length) {
      throw new Error(
        `Expecting ${paramtypes.length} parameters for constructor, received ${args1.length}  `
      );
    }
    Container.register(key, new target(...args1));
  };
}
