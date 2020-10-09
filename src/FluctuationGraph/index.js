import React, {useState, useEffect} from 'react'
import {Line} from '@ant-design/charts'

const FluctuationGraph = ({rates, symbol}) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  rates = Object.entries(rates)

  if (loaded)
    console.log('all rates', rates)

  const data = []

  rates.forEach(rate => {
    console.log(`Symbol: ${symbol}`)
    console.log(`Keys: ${Object.keys(rate[1])}`)

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

    console.log('data', data.slice(0, 10))

  return (
    <>
      <div style={{maxWidth: '100%', position: 'relative', top: '0'}} className={'mini-bar'}>
        {/*{loaded && data.length && (<TimelineChart height={150} data={data.slice(0, 2)} titleMap={{y1: 'USD', y2: symbol}} />)}*/}
        {loaded && data.length && (<Line height={160} {...config} />)}
      </div>
    </>
  )

}

export default FluctuationGraph