import React, {useState, useEffect, useRef} from 'react'
import {Col, Row, Divider, Card, Statistic, PageHeader, List, Typography} from 'antd'
import {UsergroupAddOutlined, HomeOutlined, DollarOutlined, AudioOutlined, GlobalOutlined} from '@ant-design/icons'
import FluctuationGraph from '../FluctuationGraph'
import PopulationDonut from '../PopulationDonut'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'

const CountryInfo = ({name, capital, region, subregion, population, latlng, currencies, languages, flag, countries, exchangeRates}) => {
  const style = {marginBottom: 20}
  const [loaded, setLoaded] = useState(false)

  const countriesInRegion = [...countries.filter(country => country.subregion === subregion)]
  const countryPopulationData = [...countriesInRegion.map(country => {
    return {'type': country.name, 'value': parseInt(country.population)}
  })].slice(0, 10)

  return (
    <>
      <Row gutter={20}>
        <Col xs={24} md={12} xl={8} className="gutter-row">

          {flag && (
            <Card style={style}>
              <img src={flag} alt={"flag"} style={{width: '100%'}}/>
            </Card>
          )}

          {capital && (
            <Card style={style}>
              <Statistic title={`Capital`} value={capital} prefix={<HomeOutlined/>}/>
            </Card>
          )}

          {region && subregion && (
            <Card style={style}>
              <Statistic title={subregion} value={region} prefix={<GlobalOutlined/>}/>
              <Divider/>
              <PopulationDonut data={countryPopulationData} region={subregion} />
            </Card>
          )}

        </Col>
        <Col xs={24} sm={12} xl={8} className="gutter-row">

          {population && (
            <Card style={style} loading={loaded}>
              <Statistic title={`population`} value={population} prefix={<UsergroupAddOutlined/>}/>
            </Card>
          )}

          {languages && (
            <Card style={style} title={(<><AudioOutlined/> Languages</>)}>
              {languages.length > 0 && (
                <List
                  itemLayout={`horizontal`}
                  dataSource={languages.map((language) => {
                    return {title: language.name}
                  })}
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
            <Card style={style} title={(<><DollarOutlined/> Currencies</>)}>
              {currencies.length > 0 && (
                <List
                  itemLayout={`horizontal`}
                  dataSource={currencies.map((currency) => {
                    return {title: `${currency.name} (${currency.code})`, symbol: currency.symbol, code: currency.code}
                  })}
                  renderItem={(item) => (
                    <List.Item style={{display: 'block'}}>
                      <List.Item.Meta
                        title={`${[item.title]}`}
                        description={`Symbol: ${[item.symbol]}`}
                      />

                      <FluctuationGraph rates={exchangeRates} symbol={item.code} />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          )}

        </Col>
        <Col xs={24} sm={12} xl={8} className="gutter-row">
          <Map center={latlng} zoom={3}>
            <Marker anchor={latlng} payload={1} onClick={({event, anchor, payload}) => {
            }}/>
          </Map>
        </Col>
      </Row>
    </>
  )
}

export default CountryInfo
