import React from 'react'
import {Col, Row, Divider, Card, Statistic, PageHeader, List, Avatar} from 'antd'
import {UsergroupAddOutlined, HomeOutlined, DollarOutlined, AudioOutlined, GlobalOutlined} from '@ant-design/icons'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'

const CountryInfo = ({name, capital, region, subregion, population, latlng, currencies, languages, flag}) => {
  const style = { marginBottom: 20 }

  return (
    <>
      <PageHeader title={name} style={{paddingBottom: 0, paddingTop: 25}} />
      <Divider />
      <Row gutter={20}>
        <Col span={8} className="gutter-row">
          <Card style={style}>
            <img src={flag} alt={"flag"} style={{width: '100%'}} />
          </Card>
          <Card style={style}>
            <Statistic title={`Capital`} value={capital} prefix={<HomeOutlined />} />
          </Card>
          <Card style={style}>
            <Statistic title={subregion} value={region} prefix={<GlobalOutlined />} />
          </Card>
        </Col>
        <Col span={8} className="gutter-row">
          <Card style={style}>
            <Statistic title={`population`} value={population} prefix={<UsergroupAddOutlined />} />
          </Card>
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
