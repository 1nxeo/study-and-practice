/* eslint-disable @typescript-eslint/no-explicit-any */
export default class DeepCopy {
    private cache : WeakMap<any, any>
    private methods: {[key:string]: (input:any) => any}

    constructor(){
        this.cache = new WeakMap();
        this.methods = {
            Object: this.copyObject,
            Array: this.copyArray,
            Map: this.copyMap,
            Set: this.copySet,
            Date: this.copyDate,
            RegExp: this.copyRegExp
        }
    }

    public copy(input:any){
        if (typeof input !== 'object' || input === null) return input;
        
        const cache = this.cache
        if(cache.has(input)){
            return this.cache.get(input)
        }

        const constructor = input.constructor.name;
        const copyMethod = this.methods[constructor];

        if (copyMethod) {
            return copyMethod.call(this, input)
        }
        return input
    }

    private copyArray(input:Array<any>){
        const result: any[] = [];

        input.forEach((value, index) => {
        result[index] = this.copy(value);
        });

        return result;
    }

    private copyMap(input: Map<any, any>){
        const result = new Map();
        const cache = this.cache
        cache.set(input, result);

        input.forEach((value, key) => {
            const copiedKey = this.copy(key);
            const copiedValue = this.copy(value);

            result.set(copiedKey, copiedValue);
        });

        return result;
    }
    private copySet(input:Set<any>){
        const result = new Set();

        input.forEach((value) => {
        const copiedValue = this.copy(value);

        result.add(copiedValue);
        });

        return result;
    }

    private copyObject<T extends object>(input: T): T {
        const result= {} as T;
        const cache = this.cache
        cache.set(input, result);

        for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
            result[key] = this.copy(input[key]);
        }
        }

        return result;
    }

    private copyDate(input:Date){
        return new Date(input);
    }

    private copyRegExp(input:RegExp){
        return new RegExp(input)
    }
}

