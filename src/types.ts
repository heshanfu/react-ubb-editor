import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

/**
 * button - just a button
 * extend - expand a menu after button click
 * custom - custom how to render the menu
 */
export enum ConfigType {
  Button,
  Extend,
  Custom,
}

export enum ExtendValueType {
  Main,
  Sub,
  Content,
}

export interface IMap<T> {
  [key: string]: T
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * @export
 * @interface IState
 * @description state of editor
 */
export interface IState {
  /**
   * @type {string}
   * @memberof IState
   * @description value of editor
   */
  value: string
  /**
   * @type {number}
   * @memberof IState
   * @description where the select starts
   */
  start: number
  /**
   * @type {number}
   * @memberof IState
   * @description where the select ends
   */
  end: number
}

/**
 * @export
 * @interface IAction
 * @description to be dispatched after the button clicked
 */
export interface IAction {
  /**
   * @type {('button' | 'extend')}
   * @memberof IAction
   * @description determine which default handler to be used
   */
  type: ConfigType
  /**
   * @type {string}
   * @memberof IAction
   * @description determine which specific handler to be used
   */
  tagName: string
  /**
   * @type {{mainValue?: string, subValues?: { key: string, value: string }[]}}
   * @memberof IAction
   * @description extra message passed by action
   */
  payload?: {
    /**
     * @type {string}
     * @example mainValue of '[align=center]' is center
     */
    mainValue?: string
    /**
     * @type {{ key: string, value: string | boolean }[]}
     * @example subValues of '[iframe,width=200,height=100]' is [{ width: '200', height: '100' }]
     */
    subValues?: Array<{
      key: string
      value: string | boolean,
    }>
    /**
     * @type {string}
     * @example content of '[url]foo[/url]' is 'foo'
     */
    content?: string,
  }
  /**
   * @description after insert the value, whether to select the content
   * @type {boolean}
   * @memberof IAction
   */
  shouldSelect?: boolean
  /**
   * @description after insert the value, whether to insert a new enter
   * @type {boolean}
   * @memberof IAction
   */
  shouldEnter?: boolean
}

export type handler = (state: IState, action: IAction) => IState

/**
 * @interface IUBBBaseConfig
 * @description base interface of config
 */
interface IUBBBaseConfig {
  /**
   * @type {buttonType}
   * @memberof IUBBBaseConfig
   * @description type of button
   */
  type: ConfigType
  /**
   * @type {string}
   * @memberof IUBBBaseConfig
   * @description tagName added into quote mark, should be unique
   */
  tagName: string
  /**
   * @type {number}
   * @memberof IUBBBaseConfig
   * @description index of the button, higher are later
   */
  index: number
  /**
   * @type {string}
   * @memberof IUBBBaseConfig
   * @description displayed when mouse hover the button
   */
  title?: string
  /**
   * @type {IconDefinition}
   * @memberof IUBBBaseConfig
   * @description fontawesome icon type, will be displayed inside the button
   */
  icon?: IconDefinition
  /**
   * @type {React.ReactNode}
   * @memberof IUBBBaseConfig
   * @description will be displayed inside the button
   */
  label?: React.ReactNode
  /**
   * @memberof IUBBBaseConfig
   * @description custom how to handle the action and insert the code
   */
  handler?: handler
  /**
   * @type {}
   * @memberof IUBBBaseConfig
   * @description default action
   */
  defaultAction?: IAction
}

/**
 * @export
 * @interface IUBBButtonConfig
 * @extends {IUBBBaseConfig}
 * @description just a simple button
 */
export interface IUBBButtonConfig extends IUBBBaseConfig {
  /**
   * @type {('button')}
   * @memberof IUBBButtonConfig
   * @description determine which default handler to be used
   */
  type: ConfigType.Button
}

/**
 * @export
 * @interface IUBBExtendConfig
 * @extends {IUBBBaseConfig}
 * @description button with extra menu
 */
export interface IUBBExtendConfig extends IUBBBaseConfig {
  /**
   * @type {('extend')}
   * @memberof IUBBExtendConfig
   * @description determine which default handler to be used
   */
  type: ConfigType.Extend
  /**
   * @memberof IUBBExtendConfig
   * @description inputs that will be displayed in extra menu
   */
  inputs: Array<{
    /**
     * @type {string}
     * @description placeholder for input
     */
    label: string
    /**
     * @description key of value in action, empty string for main value
     * @type {string}
     */
    key: string
    /**
     * @description
     * @type {ExtendValueType}
     */
    type: ExtendValueType,
  }>
  /**
   * @memberof IUBBExtendConfig
   * @description rendered inside the extend bar
   */
  ExtraComponent?: React.ComponentClass<ICustomComponentProps>
}

/**
 * @export
 * @interface IUBBCustomConfig
 * @description custom button
 */
export interface IUBBCustomConfig extends IUBBBaseConfig {
  /**
   * @type {'custom'}
   * @memberof IUBBCustomConfig
   */
  type: ConfigType.Custom
  /**
   * @memberof IUBBCustomConfig
   * @description will be rendered under the button
   */
  Component: React.ComponentClass<ICustomComponentProps>
}

export type dispatch = (action: IAction) => void

export interface ICustomComponentProps {
  dispatch: dispatch
  message: (message: string) => void
}

export type IUBBConfig = IUBBButtonConfig | IUBBCustomConfig | IUBBExtendConfig
export type ConfigMap = IMap<IUBBConfig>

export interface IConfig {
  configs: IUBBConfig[]
  UbbContainer?: React.ComponentType<{ value: string }>
}
