import { expect } from "chai";
import { setParameter } from "./set-parameter"

describe('setParameter function', ()=>{

    it('should return source parameter', () =>{
        let source = 'Hello NY';
        let result = setParameter(source, 'Hello World')

        expect(result).equal(source);
    })

    it('should return default param', () =>{

        let defaultParam = 'Hello World'
        let result = setParameter(null, defaultParam)

        expect(result).equal(defaultParam)

    })
})