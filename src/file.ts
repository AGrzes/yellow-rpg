import {readFile} from 'fs'
import { Glob } from 'glob'
import { bindNodeCallback, Observable, Observer} from 'rxjs'
import { flatMap, map} from 'rxjs/operators'
const readFileObservable = bindNodeCallback((
  path: string,
  encoding: string,
  callback: (err: NodeJS.ErrnoException, data: string) => void) =>
  readFile(path, encoding, callback))

export class FileSource {
    constructor(private pattern) {}

    public scan(): Observable<any> {
      return Observable.create((observer: Observer<any>) => {
        const glob = new Glob(this.pattern, {silent: true}, (err, data) => {
          if (err) {
            observer.error(err)
          } else {
            data.forEach((item) => observer.next(item))
            observer.complete()
          }
        })
      })
    }
}

export const read = () =>
  flatMap<string, {path: string, content: string}>((path) =>
    readFileObservable(path, 'UTF-8').pipe(map((content) => ({path, content}))))
