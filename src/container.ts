import { DiLogger } from "./utils/DiLogger";

export class Container {
  private static registry: Map<string, any> = new Map<string, any>();

  static resolve(key: string): any {
    if (!Container.registry.has(key)) {
      DiLogger.throwException("NO type registered with key: " + key);
      return;
    }

    return Container.registry.get(key);
  }

  static clear() {
    Container.registry.clear();
  }

  static register(key: string, value: any, override: boolean = false) {
    if (!override && Container.registry.has(key)) {
      DiLogger.throwException(`Type already registed with Key: ${key}`);
      return;
    }

    Container.registry.set(key, value);
  }

  static unRegister(key: string) {
    if (Container.registry.has(key)) {
      Container.registry.delete(key);
      return;
    }
    DiLogger.throwException(`Type with key: ${key} Does not exists`);
  }
}
