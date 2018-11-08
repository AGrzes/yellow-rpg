import {expect} from 'chai'
import 'mocha'
import * as mock from 'mock-fs'
import {toArray} from 'rxjs/operators'
import {FileSource} from '../src/file'
describe('file', function() {
  describe('FileSource', function() {
    beforeEach(() => {
      mock({
        '/dir1/dir2': {
          'file1.json': JSON.stringify({})
        },
        '/dir3': mock.directory({
          mode: 0,
          items: {
            dir4: {
              'file1.json': JSON.stringify({})
            }
          }
        })
      })
    })
    afterEach(() => {
      mock.restore()
    })
    it('should emit files', function(done) {
      new FileSource('/dir1/**/*.json').scan().pipe(toArray()).subscribe({
        next(files) {
          expect(files).to.be.deep.equals(['/dir1/dir2/file1.json'])
        },
        complete() {
          done()
        }
      })
    })
    it('should return error on inaccessible path', function(done) {
      new FileSource('/dir3/**/*.json').scan().pipe(toArray()).subscribe({
        error(err) {
          expect(err).to.exist
          done()
        },
        complete() {
          done()
        },
        next() {
          expect.fail()
        }
      })
    })

  })
})
