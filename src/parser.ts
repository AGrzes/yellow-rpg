import { map } from 'rxjs/operators'

export const json = () => map(({content, ...rest}) => ({content: JSON.parse(content), ...rest}))
