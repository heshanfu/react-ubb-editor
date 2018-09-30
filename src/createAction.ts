import { Omit } from 'lodash'
import { IAction, IUBBConfig } from './types'

// prettier-ignore
const createAction: (
  config: IUBBConfig,
  payload?: IAction['payload'],
  customAction?: Omit<IAction, 'payload' | 'tagName' | 'type'>,
) => IAction = (config, payload, customAction) => {
  const { tagName, type, defaultAction } = config

  const action: IAction = defaultAction || {
    tagName,
    type,
  }

  if (payload) {
    action.payload = payload
  }

  if (customAction) {
    Object.assign(action, customAction)
  }

  return action
}

export default createAction
