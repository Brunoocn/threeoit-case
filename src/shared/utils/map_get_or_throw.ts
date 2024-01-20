export class MapGetOrThrow<K, V> extends Map<K, V> {
  constructor(entries?: readonly (readonly [K, V])[] | null) {
    super(entries);
  }

  public getOrThrow(key: K): any {
    if (!this.has(key)) {
      throw new Error(`Key ${key} not found`);
    }

    return this.get(key);
  }
}
