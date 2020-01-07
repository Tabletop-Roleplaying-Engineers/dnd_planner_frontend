import React from 'react'
import { action } from '@storybook/addon-actions'
import { Calendar } from './Calendar'

export default {
  title: 'Calendar',
}

const game = {
  "id": "24eafa10-aae6-11e9-b40a-17eca27046c4",
  "title": "Long long long long long long long long long long long long long long long long long long text",
  "image": "https://i.imgur.com/4TOycKz.png",
  "description": "Long long long long long long long long long long long long long long long long long long text",
  "startingDate": `${Date.now()}`,
  "lvlFrom": 1,
  "lvlTo": 4,
  "players": 4,
  "status": "CAN_PARTICIPATE",
  "tags": [
    "90b0d440-2a66-11ea-b334-0b5db2ee645b",
    "90b08620-2a66-11ea-b334-0b5db2ee645b"
  ],
  "characters": [],
  "user": {
    "id": "c9ab36d0-aae3-11e9-b40a-17eca27046c4",
    "firstName": "Rostyslav",
    "lastName": "Melnychuk",
    "avatar": "https://t.me/i/userpic/320/iKethavel.jpg",
    "username": "iKethavel",
    "__typename": "User"
  },
  "__typename": "Game"
}

export const Default = () => <Calendar games={[game]} onCellClick={action('onCellClick')} />
