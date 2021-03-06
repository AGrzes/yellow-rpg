import { expect } from 'chai'
import {Model, ModelBuilder} from '../src/model'

describe('model', function() {
  describe('ModelBuilder', function() {
    it('should build model', function() {
      expect(new ModelBuilder().build()).to.be.instanceof(Model)
    })

    it('should add entity', function() {
      const builder = new ModelBuilder()
      builder.entity('id')
      const model = builder.build()
      expect(model.get('id')).to.exist
    })

    it('should add entity attributes', function() {
      const builder = new ModelBuilder()
      builder.entity('id').attributes({ name: 'value'})
      const model = builder.build()
      expect(model.get('id').attributes()).to.be.deep.equals({ name: 'value'})
    })
  })
})
