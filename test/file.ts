import {expect} from 'chai'
import 'mocha'
import * as mock from 'mock-fs'
import {toArray} from 'rxjs/operators'
import {FileSource} from '../src/file'
describe('file', function() {
  describe('FileSource', function() {
    beforeEach(() => {
      mock({
        'dir1/dir2': {
          'file1.json': JSON.stringify({})
        }
      })
    })
    afterEach(() => {
      mock.restore()
    })
    it('should emit files', function(done) {
      new FileSource('**/*.json').scan().pipe(toArray()).subscribe((files) => {
        expect(files).to.be.deep.equals(['dir1/dir2/file1.json'])
        done()
      })
    })

  })
})
