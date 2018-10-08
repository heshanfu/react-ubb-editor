import * as React from 'react'
import { Textarea as Text } from './styles'

// @ts-ignore override interface type
export interface IProps
  extends React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    > {
  onChange: (value: string) => void
  value: string
  ref?: any
}

export default class Textarea extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props)
    this.undo = this.undo.bind(this)
    this.redo = this.redo.bind(this)
    this.blur = this.blur.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }

  private scrollTop: number = 0
  textarea!: HTMLTextAreaElement
  private valueStack: string[] = ['']
  private redoStack: string[] = []

  undo() {
    if (this.valueStack.length === 1) {
      return
    }
    let prevValue = this.valueStack.pop() as string
    this.redoStack.push(prevValue)
    prevValue = this.valueStack[this.valueStack.length - 1]
    this.props.onChange(prevValue)
  }

  redo() {
    const prevValue = this.redoStack.pop()
    if (prevValue) {
      this.valueStack.push(prevValue)
      this.props.onChange(prevValue)
    }
  }

  blur() {
    this.textarea.blur()
  }

  private changeValue(value: string) {
    this.props.onChange(value)
    this.valueStack.push(value)
    this.textarea.scrollTop = this.scrollTop
  }

  componentWillReceiveProps(newProps: IProps) {
    if (newProps.value !== this.valueStack[this.valueStack.length - 1]) {
      this.valueStack.push(newProps.value)
      this.redoStack = []
    }
  }

  render() {
    return (
      <Text
        innerRef={(it: any) => (this.textarea = it)}
        {...this.props}
        onChange={e => this.changeValue(e.target.value)}
        onScroll={() => (this.scrollTop = this.textarea.scrollTop)}
        onFocus={() => (this.textarea.scrollTop = this.scrollTop)}
        onInput={() => (this.redoStack = [])}
        onKeyDown={e => {
          if (this.props.onKeyDown) this.props.onKeyDown(e)
          if (e.key === 'z' && e.ctrlKey) this.undo()
          if (e.key === 'y' && e.ctrlKey) this.redo()
        }}
      />
    )
  }
}
