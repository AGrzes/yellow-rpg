import * as YAML from 'js-yaml'
import { map } from 'rxjs/operators'

export const json = () => map(({content, ...rest}) => ({content: JSON.parse(content), ...rest}))

function  flatten<T>(array: T[]): T | T[] {
  if (array.length === 1) {
    return array[0]
  } else {
    return array
  }
}

export const yaml = () => map(({content, ...rest}) => ({content: flatten(YAML.safeLoadAll(content)), ...rest}))
