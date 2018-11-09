import {expect} from 'chai'
import { Observable, of } from 'rxjs'
import { toArray } from 'rxjs/operators'
import {json} from '../src/parser'

describe('parser', function() {
  describe('json', function() {
    it('should parse json', function(done) {
      const object = { test: 'test'}
      of({content: JSON.stringify(object)}).pipe(json(), toArray()).subscribe((items) => {
        expect(items).to.be.deep.equals([{content: object}])
        done()
      })
    })
    it('should keep other attributes', function(done) {
      const object = { test: 'test'}
      of({content: JSON.stringify(object), other: 'other'}).pipe(json(), toArray()).subscribe((items) => {
        expect(items).to.be.deep.equals([{content: object, other: 'other'}])
        done()
      })
    })
  })
})