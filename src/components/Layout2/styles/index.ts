

import { css } from '@emotion/css'


const color = 'white'

export const RootVh = css`
    height: 100vh;
`

export const HeaderSticky = css`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center,
`

export const ButtonStyle = css`
  padding: 12px;
  background-color: hotpink;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  width: 100px;

  &:hover {
    color: ${color};
  }
  &::after {
  }
`

// export default ButtonStyle
