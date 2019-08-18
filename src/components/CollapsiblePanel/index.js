import { Card } from 'antd'
import React, { useRef, useLayoutEffect, useState } from 'react'
import styled, { css } from 'styled-components'

const CollapsibleContent = styled('div')`
  height: 0;
  overflow: hidden;
  transition: 0.2s height;
  ${props => props.opened && css`
    height: ${props.height}px;
  `}
`

const CollapsiblePanel = ({ renderHeader, children }) => {
  const [ contentHeight, setContentHeight ] = useState(0);
  const [ opened, setOpened ] = useState(false);
  const contentRef = useRef(null);
  useLayoutEffect(() => {
    setContentHeight(contentRef.current.offsetHeight)
  })

  return (
    <Card size="small">
      <div onClick={() => setOpened(!opened)}>
        {renderHeader()}
      </div>
      <CollapsibleContent opened={opened} height={contentHeight}>
        <div ref={contentRef}>
          {children}
        </div>
      </CollapsibleContent>
    </Card>
  )
}

export default CollapsiblePanel;
