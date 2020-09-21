import React, { useState, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { Drawer, Modal } from 'antd'
import { modalWidth } from 'config'
import { EditGameContainer } from './EditGameContainer'

export const EditGameDrawer = ({
  game,
  onUpdated = () => {},
  onCancel = () => {},
}) => {
  const [cancelEditingConfirmation, setCancelEditingConfirmation] = useState(
    false,
  )
  const onCancelEditing = useCallback(() => {
    onCancel()
    setCancelEditingConfirmation(false)
  }, [])

  return (
    <>
      <Drawer
        width={modalWidth()}
        placement="right"
        closable={false}
        destroyOnClose={true}
        visible={!!game}
        onClose={() => setCancelEditingConfirmation(true)}
      >
        <EditGameContainer game={game || {}} onUpdated={onUpdated} />
      </Drawer>

      {/* Cancel editing confirmation dialog */}
      <Modal
        title={<FormattedMessage id="common.cancelEditing" />}
        visible={cancelEditingConfirmation && game}
        okText={<FormattedMessage id="common.cancel" />}
        onOk={() => onCancelEditing(false)}
        cancelText={<FormattedMessage id="common.proceed" />}
        onCancel={() => setCancelEditingConfirmation(false)}
      >
        <p>
          <FormattedMessage id="common.cancelEditingMessage" />
        </p>
      </Modal>
    </>
  )
}
