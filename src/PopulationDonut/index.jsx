import React, {useState, useEffect} from 'react'
import {Typography} from 'antd'
import Pie from '@ant-design/charts/es/pie'

const {Title} = Typography

const PopulationDonut = ({data, region}) => {
  const [loaded, setLoaded] = useState(false)
  const config = {
    data,
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.5,
    label: {
      type: 'inner',
      offset: '-0.5',
      content: '{percentage}',
      style: {
        fill: '#fff',
        fontSize: 14,
        textAlign: 'center'
      }
    },
    statistic: {
      title: false,
      content: true
    },
    interactions: [{type: 'pie-statistic-active'}]
  }

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {loaded && (
        <div>
          <Title level={4}>
            Top {data.length} largest countries in {region} based on population.
          </Title>
          <Pie {...config} style={{height: '20vw'}}/>
        </div>
      )}
    </>
  )
}

export default PopulationDonut
