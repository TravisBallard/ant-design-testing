import React, {useState, useEffect} from 'react'
import {Line} from '@ant-design/charts'

const FluctuationGraph = ({rates, symbol}) => {
  rates = Object.entries(rates)
  const [loaded, setLoaded] = useState(false)
  const data = []

  rates.forEach(rate => {
    if (Object.keys(rate[1]).includes(symbol)) {
      data.push({x: rate[0], y: rate[1][symbol], name: symbol})
      data.push({x: rate[0], y: rate[1]['USD'], name: 'USD'})
    }
  })

  const config = {
    data: data.slice(0, 30),
    xField: 'x',
    yField: 'y',
    seriesField: 'name',
    YAXIS: {label: {Formatter: (V) => ` $ { ( V / 1000000000 ) . toFixed ( . 1 ) } B `}},
    legend: {position: 'top'},
    smooth: true,
  }

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <div style={{maxWidth: '100%'}}>
        {loaded && data.length && (
          <Line height={160} {...config} />
        )}
      </div>
    </>
  )

}

export default FluctuationGraph