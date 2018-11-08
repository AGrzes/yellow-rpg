import { Glob } from 'glob'
import { Observable, Observer} from 'rxjs'

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
