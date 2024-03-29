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
  const [cancelEditingConfirmation, setCancelEditingConfirmation] =
    useState(false)
  const onCancelEditing = useCallback(() => {
    onCancel()
    setCancelEditingConfirmation(false)
  }, [onCancel])
  const isEdit = !!(game && game.id)

  return (
    <>
      <Drawer
        width={modalWidth()}
        placement="right"
        closable={false}
        destroyOnClose={true}
        open={!!game}
        onClose={() => setCancelEditingConfirmation(true)}
      >
        <EditGameContainer game={game || {}} onUpdated={onUpdated} />
      </Drawer>

      {/* Cancel editing confirmation dialog */}
      <Modal
        title={
          <FormattedMessage
            id={isEdit ? 'common.cancelEditing' : 'common.cancelCreating'}
          />
        }
        open={cancelEditingConfirmation && game}
        okText={<FormattedMessage id="common.cancel" />}
        onOk={() => onCancelEditing(false)}
        cancelText={<FormattedMessage id="common.proceed" />}
        onCancel={() => setCancelEditingConfirmation(false)}
        destroyOnClose={true}
      >
        <p>
          <FormattedMessage
            id={
              isEdit
                ? 'common.cancelEditingMessage'
                : 'common.cancelCreatingMessage'
            }
          />
        </p>
      </Modal>
    </>
  )
}
