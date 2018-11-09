import {expect} from 'chai'
import * as YAML from 'js-yaml'
import { of } from 'rxjs'
import { toArray } from 'rxjs/operators'
import {json, yaml} from '../src/parser'

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
  describe('yaml', function() {
    it('should parse yaml', function(done) {
      const object = { test: 'test'}
      of({content: YAML.dump(object)}).pipe(yaml(), toArray()).subscribe((items) => {
        expect(items).to.be.deep.equals([{content: object}])
        done()
      })
    })
    it('should parse multi document yaml', function(done) {
      const object = { test: 'test'}
      of({content: '---\n' + [object, object].map((s) => YAML.dump(s)).join('---\n')})
        .pipe(yaml(), toArray()).subscribe((items) => {
        expect(items).to.be.deep.equals([{content: [object, object]}])
        done()
      })
    })
    it('should keep other attributes', function(done) {
      const object = { test: 'test'}
      of({content: YAML.dump(object), other: 'other'}).pipe(yaml(), toArray()).subscribe((items) => {
        expect(items).to.be.deep.equals([{content: object, other: 'other'}])
        done()
      })
    })
  })
})
