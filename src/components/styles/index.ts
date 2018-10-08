import styled, { css, keyframes } from 'react-emotion'

const slideIn = keyframes`
  from {
    top: 10px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
`

const clear = css`
  appearance: none;
  border: none;
  margin: 0;
  padding: 0;

  &::-ms-expand {
    display: none;
  }

  &:focus {
    outline: 0;
  }

  &:active {
    border: 0;
  }
`

export const Button = styled('button')`
  ${clear};
  cursor: pointer;
  width: 1.5rem;
  height: 2rem;
  margin: 0 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ButtonContainer = styled('div')`
  position: relative;
`

export const Input = styled('input')`
  ${clear};
`

export const Textarea = styled('textarea')`
  ${clear};
  width: 100%;
  flex-grow: 1;
  resize: none;
  font-size: inherit;
  padding: 0.5rem;
  box-sizing: border-box;
`

export const Root = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`

export const ButtonRoot = styled('div')`
  width: 100%;
  height: 2em;
  display: flex;
`

export const ExtendRoot = styled('div')<{ isShown: boolean }>(
  props => ({
    height: props.isShown ? '2em' : '0em',
  }),
  css`
    display: flex;
    transition-duration: 0.1s;
    transition-property: height;

    form {
      display: flex;
    }
  `,
)

export const NoticeContainer = styled('div')`
  position: absolute;
  top: 2rem;
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  pointer-events: none;

  div,
  span {
    width: 100%;
    height: 2rem;
  }

  .rc-notification-notice {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 10px;
  }

  .rc-notification-notice-content {
    animation: ${slideIn} 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 12px;
    min-width: 10rem;
    width: auto;
    color: #222;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
`
