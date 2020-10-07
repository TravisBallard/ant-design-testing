import React from 'react'
import {Col, Row, Divider, Card, Statistic, PageHeader, List, Avatar} from 'antd'
import {PushpinFilled} from '@ant-design/icons-svg'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'

const CountryInfo = ({name, capital, region, subregion, population, latlng, currencies, languages, flag}) => {
  const style = { marginBottom: 20 }
  console.log(`latlng`, latlng)
  return (
    <>
      <PageHeader title={name} />
      <Divider />
      <Row gutter={20}>
        <Col span={8} className="gutter-row">
          <Card style={style}>
            <Statistic title={`Capital`} value={capital} />
          </Card>
          <Card style={style}>
            <Statistic title={subregion} value={region} />
          </Card>
        </Col>
        <Col span={8} className="gutter-row">
          <Card style={style}>
            <Statistic title={`population`} value={population} />
          </Card>
          <Card style={style} title={`Languages`}>
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
          <Card style={style} title={`Currencies`}>
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
