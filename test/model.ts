import { expect } from 'chai'
import {Model, ModelBuilder} from '../src/model'

describe('model', function() {
  describe('ModelBuilder', function() {
    it('should build model', function() {
      expect(new ModelBuilder().build()).to.be.instanceof(Model)
    })
  })
})
