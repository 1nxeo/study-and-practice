import DeepCopy from "./deepCopy.class"

describe('deepCopy 클래스 테스트', () => {
    let deepCopy: DeepCopy;
  
    beforeEach(() => {
      deepCopy = new DeepCopy(); // 각 테스트마다 새로운 인스턴스 생성
    });
    // 기본 타입 테스트
    describe('기본 타입 테스트', () => {
      it('숫자 타입이 정상적으로 복사되는지 확인한다', () => {
        const original = 42;
        const copied = deepCopy.copy(original);
        expect(copied).toBe(original);
      });
  
      it('문자열 타입이 정상적으로 복사되는지 확인한다', () => {
        const original = 'test string';
        const copied = deepCopy.copy(original);
        expect(copied).toBe(original);
      });
  
      it('불리언 타입이 정상적으로 복사되는지 확인한다', () => {
        const original = true;
        const copied = deepCopy.copy(original);
        expect(copied).toBe(original);
      });
  
      it('null 값이 정상적으로 복사되는지 확인한다', () => {
        const original = null;
        const copied = deepCopy.copy(original);
        expect(copied).toBeNull();
      });
  
      it('undefined 값이 정상적으로 복사되는지 확인한다', () => {
        const original = undefined;
        const copied = deepCopy.copy(original);
        expect(copied).toBeUndefined();
      });
    });
  
    // 참조 타입 테스트
    describe('참조 타입 테스트', () => {
      it('빈 객체가 정상적으로 복사되는지 확인한다', () => {
        const original = {};
        const copied = deepCopy.copy(original);
        expect(copied).toEqual({});
        expect(copied).not.toBe(original);
      });
  
      it('중첩된 객체가 정상적으로 복사되는지 확인한다', () => {
        const original = { a: { b: { c: 1 } } };
        const copied = deepCopy.copy(original);
        expect(copied).toEqual(original);
        expect(copied.a).not.toBe(original.a);
        expect(copied.a.b).not.toBe(original.a.b);
      });
  
      it('빈 배열이 정상적으로 복사되는지 확인한다', () => {
        const original: any[] = [];
        const copied = deepCopy.copy(original);
        expect(copied).toEqual([]);
        expect(copied).not.toBe(original);
      });
  
      it('객체를 포함한 배열이 정상적으로 복사되는지 확인한다', () => {
        const original = [{ a: 1 }, { b: 2 }];
        const copied = deepCopy.copy(original);
        expect(copied).toEqual(original);
        expect(copied[0]).not.toBe(original[0]);
      });
    });
  
    // 특수 객체 테스트
    describe('특수 객체 테스트', () => {
      it('Date 객체가 정상적으로 복사되는지 확인한다', () => {
        const original = new Date();
        const copied = deepCopy.copy(original);
        expect(copied).toEqual(original);
        expect(copied).not.toBe(original);
      });
  
      it('RegExp 객체가 정상적으로 복사되는지 확인한다', () => {
        const original = /test/gi;
        const copied = deepCopy.copy(original);
        expect(copied).toEqual(original);
        expect(copied).not.toBe(original);
      });
  
      it('Map 객체가 정상적으로 복사되는지 확인한다', () => {
        const original = new Map([['key', 'value']]);
        const copied = deepCopy.copy(original);
        expect(copied instanceof Map).toBe(true);
        expect(copied.get('key')).toBe('value');
        expect(copied).toEqual(original);
        expect(copied).not.toBe(original);
      });
  
      it('Set 객체가 정상적으로 복사되는지 확인한다', () => {
        const original = new Set([1, 2, 3]);
        const copied = deepCopy.copy(original);
        expect(copied instanceof Set).toBe(true);
        expect([...copied]).toEqual([1, 2, 3]);
        expect(copied).toEqual(original);
        expect(copied).not.toBe(original);
      });
    });
  
    // 순환 참조 테스트
    describe('순환 참조 테스트', () => {
      it('순환 참조를 포함한 객체가 정상적으로 복사되는지 확인한다', () => {
        const original: any = { a: 1 };
        original.self = original;
        const copied = deepCopy.copy(original);
        expect(copied.a).toEqual(1);
        expect(copied.self).toEqual(copied);
        expect(copied).not.toBe(original);
      });
  
      it('순환 참조를 포함한 Map이 정상적으로 복사되는지 확인한다', () => {
        const original = new Map();
        original.set('self', original);
        const copied = deepCopy.copy(original);
        expect(copied instanceof Map).toBe(true);
        expect(copied).toEqual(original);
        expect(copied.get('self')).toEqual(copied);
        expect(copied).not.toBe(original);
      });
    });
  
    // 복합 테스트
    describe('복합 테스트', () => {
      it('Map과 Set을 동시에 포함하는 객체가 정상적으로 복사되는지 확인한다', () => {
        const original = {
          map: new Map([['key', 'value']]),
          set: new Set([1, 2, 3]),
        };
        const copied = deepCopy.copy(original);
        expect(copied.map instanceof Map).toBe(true);
        expect(copied.set instanceof Set).toBe(true);
        expect(copied).toEqual(original);
        expect(copied).not.toBe(original);
        expect(copied.map).not.toBe(original.map);
        expect(copied.set).not.toBe(original.set);
      });
  
      it('모든 타입이 혼합된 복잡한 객체가 정상적으로 복사되는지 확인한다', () => {
        const original = {
          string: 'test',
          number: 42,
          boolean: true,
          null: null,
          undefined: undefined,
          array: [1, { nested: true }],
          date: new Date(),
          regexp: /test/gi,
          map: new Map([['key', { value: 'test' }]]),
          set: new Set([{ id: 1 }]),
        };
        const copied = deepCopy.copy(original);
        expect(copied).toEqual(original);
        expect(copied).not.toBe(original);
        expect(copied.array[1]).not.toBe(original.array[1]);
        expect(copied.map.get('key')).not.toBe(original.map.get('key'));
        expect([...copied.set][0]).not.toBe([...original.set][0]);
      });
    });
  });
  