import React, {useState, useEffect, useRef} from 'react'
import {Col, Row, Divider, Card, Statistic, PageHeader, List, Typography} from 'antd'
import {UsergroupAddOutlined, HomeOutlined, DollarOutlined, AudioOutlined, GlobalOutlined} from '@ant-design/icons'
import {Pie} from '@ant-design/charts'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
const {Title} = Typography

const CountryInfo = ({name, capital, region, subregion, population, latlng, currencies, languages, flag, countries}) => {
  const style = { marginBottom: 20 }
  const [loaded, setLoaded] = useState(false)

  const countriesInRegion = [...countries.filter(country => country.subregion === subregion)]
  const data = [...countriesInRegion.map(country => { return { 'type': country.name, 'value': parseInt(country.population) } })].slice(0,10)

  const populationChartConfig = {
    appendPadding: 10,
    data,
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
        textAlign: 'center',
      },
    },
    statistic: {
      title: false,
      content: true,
      // title: { formatter: (foo) => {
      //   console.log('foo', foo)
      //   return name
      // } },
      // content: { formatter: () => population },
    },
    interactions: [{ type: 'pie-statistic-active' }],
  }

  return (
    <>
      <PageHeader title={name} style={{paddingBottom: 0, paddingTop: 25}} />
      <Divider />
      <Row gutter={20}>
        <Col span={8} className="gutter-row">

          {flag && (
            <Card style={style}>
              <img src={flag} alt={"flag"} style={{width: '100%'}} />
            </Card>
          )}

          {capital && (
            <Card style={style}>
              <Statistic title={`Capital`} value={capital} prefix={<HomeOutlined />} />
            </Card>
          )}

          {region && subregion && (
            <Card style={style}>
              <Statistic title={subregion} value={region} prefix={<GlobalOutlined />} />
              <div style={{position: 'relative', display: 'block', height: 400}}>
                <Divider />
                <Title level={4} style={{marginBottom: '-40px'}}>Top {data.length} largest countries in {subregion} based on population.</Title>
                <Pie {...populationChartConfig}/>
              </div>
            </Card>
          )}

        </Col>
        <Col span={8} className="gutter-row">

          {population && (
            <Card style={style} loading={loaded}>
              <Statistic title={`population`} value={population} prefix={<UsergroupAddOutlined />} />
            </Card>
          )}

          {languages && (
            <Card style={style} title={(<><AudioOutlined /> Languages</>)}>
              {languages.length > 0 && (
                <List
                  itemLayout={`horizontal`}
                  dataSource={languages.map((language) => { return {title: language.name}})}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={[item.title]}
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          )}

          {currencies && (
            <Card style={style} title={(<><DollarOutlined /> Currencies</>)}>
              {currencies.length > 0 && (
                <List
                  itemLayout={`horizontal`}
                  dataSource={currencies.map((currency) => { return {title: currency.code, symbol: currency.symbol}})}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={`${[item.title]}`}
                        description={`Symbol: ${[item.symbol]}`}
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          )}

        </Col>
        <Col span={8}className="gutter-row">
          <Map center={latlng} zoom={3}>
            <Marker anchor={latlng} payload={1} onClick={({ event, anchor, payload }) => {}} />
          </Map>
        </Col>
      </Row>
    </>
  )
}

export default CountryInfo
