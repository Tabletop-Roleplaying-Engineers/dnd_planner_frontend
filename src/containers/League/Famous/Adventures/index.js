import React from 'react'
import Slider from 'react-slick'
import { Box, Flex } from 'noui/Position'
import styled from 'styled-components'
import Portrait from 'ui/Portrait'
import { Header, Paragraph } from 'ui/Text'

import frankPortrait from './Frank/shared/9ZaRE7f.png'
import joelPortrait from './JoEl/shared/1502374341114.png'
import gahalPortrait from './Gahal/shared/333.JPG'
import gorinorPortrait from './Gorinor/shared/photo_2019-07-08_23-34-30.jpg'
import mordredPortrait from './Mordred/shared/DU51AHhWAAAdHdn (1).jpg'
import mornarePortrait from './Mornare/shared/4314caa9-6f42-45fc-a456-67b2233cd13a.jpeg'
import blackteaPortrait from './BlackTea/shared/75001be6-ed79-490d-b30d-f734c944f6b1.jpeg'

const ADVENTURERS = [
  {
    name: 'Сірий Френк',
    portrait: frankPortrait,
    link: '',
  },
  {
    name: 'Джо Ел',
    portrait: joelPortrait,
    link: '',
  },
  {
    name: 'Гахал Іммертум',
    portrait: gahalPortrait,
    link: '',
  },
  {
    name: 'Горінор Теранні',
    portrait: gorinorPortrait,
    link: '',
  },
  {
    name: 'Мордред',
    portrait: mordredPortrait,
    link: '',
  },
  {
    name: 'Морн’аре',
    portrait: mornarePortrait,
    link: '',
  },
  {
    name: 'БлекТі',
    portrait: blackteaPortrait,
    link: '',
  },
]

const HeroBox = styled(Box)`
  transition: all 0.5s;
`

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

const Adventures = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    swipeToSlide: true,
    centerMode: true,
    initialSlide: getRandomInt(0, ADVENTURERS.length - 1),
  }

  return (
    <Box>
      <Flex center>
        <Header fontSize={30} fontWeight="bold">
          ВИЗНАЧНІ АВАНТЮРИСТИ
        </Header>
      </Flex>

      <Flex mt={30} center>
        <Box width="80vw">
          <Slider {...settings}>
            {ADVENTURERS.map(({ name, portrait }) => (
              <HeroBox px={10}>
                <Portrait label={name} src={portrait} alt={name} />
              </HeroBox>
            ))}
          </Slider>
        </Box>
      </Flex>

      <Box mt={40}>
        <Paragraph fontSize="16px">
          Усі авантюристи прагнуть визнання та слави. Вони змагаються зі злом,
          або стають на його сторону. Перемагають в епічних битвах, або гинуть,
          стараючись. Багато зникає зі сторінок історії, так там і не
          з’явившись. Однак дехто своїми діяннями, живими чи посмертними,
          залишається в пам’яті людей як символ віри, добра та нескореності.
          Тими, на кого можна орієнтуватись чи приводити в приклад. В кожного з
          цих авантюристів була своя історія, і вона описана тут.
        </Paragraph>
      </Box>
    </Box>
  )
}

export default Adventures
