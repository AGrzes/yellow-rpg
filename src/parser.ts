import * as YAML from 'js-yaml'
import { map } from 'rxjs/operators'

export const json = () => map(({content, ...rest}) => ({content: JSON.parse(content), ...rest}))

export const yaml = () => map(({content, ...rest}) => ({content: YAML.safeLoad(content), ...rest}))
