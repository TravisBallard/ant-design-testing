
import React, {useState, useEffect} from 'react'
import {Layout, Menu, Select, Button} from 'antd'
import slugify from 'slugify'
import moment from 'moment'

import {
  GlobalOutlined,
} from '@ant-design/icons'

import './App.less'
import "antd/dist/antd.less"

import CountryInfo from './CountryInfo'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu;

/**
 * Get countries from API
 *
 * @returns {Promise<Response|void>}
 */
const getCountries = async () => {
  const storedData = localStorage.getItem('countryData')
  if (storedData) return JSON.parse(storedData)

  return await fetch('https://restcountries.eu/rest/v2/all')
    .then(result => result.json())
    .then(result => {
      localStorage.setItem('countryData', JSON.stringify(result))
      return result
    })
    .catch(e => console.error(e))
}

/**
 * Get exchange rates from api
 *
 * @param symbol
 * @param startDate
 * @param endDate
 * @returns {Promise<*>}
 */
const getExchangeRateHistory = async (num = 3, unit = 'days', base = 'USD', symbols = null) => {
  let localStorageKey = `exchange_rates_${num}_${unit}_${base}`
  if (symbols) localStorageKey += `_${symbols.replace(/,/g,'-')}`

  const storedValue = localStorage.getItem(localStorageKey)
  if (storedValue) return JSON.parse(storedValue)

  let apiUrl = `https://api.exchangerate.host/timeseries?end_date=${moment().format('YYYY-MM-DD')}&start_date=${moment().subtract(num, unit).format('YYYY-MM-DD')}&base=USD`
  if (symbols) apiUrl += `&symbols=${symbols}`

  return await fetch(apiUrl)
    .then(response => response.json())
    .then(result => {
      localStorage.setItem(localStorageKey, JSON.stringify(result))
      return result
    })
}

/**
 * Build Countries SubMenu
 *
 * @param countries
 * @param handleSelect
 * @param selectedCountry
 * @returns {JSX.Element}
 */
const buildCountriesMenu = (countries, handleSelect, selectedCountry) => {
  return (
    <SubMenu key="countries" icon={<GlobalOutlined />} title="Countries">
      {countries.map(country => (
        <Menu.Item
          key={country.alpha2Code}
          onClick={e => handleSelect(country)}
          className={
            selectedCountry
            && country.alpha2Code === selectedCountry.alpha2Code
              ? `ant-menu-item-selected`
              : ``
          }
        >
          {country.name}
        </Menu.Item>
      ))}
    </SubMenu>
  )
}

/**
 * Magic
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [exchangeRates, setExchangeRates] = useState({})

  const handleCountrySelect = value => setSelectedCountry(countries.filter(country => country.name === value)[0])

  const loadRandomCountry = () => setSelectedCountry(countries[Math.floor(Math.random() * countries.length)])

  useEffect(() => {
    getCountries()
      .then(result => {
        setCountries(result)
        if (window.location.pathname === '/') {
          setSelectedCountry(result[Math.floor(Math.random() * result.length)])
        } else {

          const selected = result.filter(c => (`/${slugify(c.name.toLowerCase())}/` === window.location.pathname ))[0]
          setSelectedCountry(selected)
        }
      })

    getExchangeRateHistory(30).then(result => {
      setExchangeRates(result.rates)
    })
  }, [])

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    if (selectedCountry) {
      window.history.pushState(null, null, `/${slugify(selectedCountry.name.toLowerCase())}/`)
      const selected = document.getElementsByClassName('ant-menu-item-selected')
      if (selected.length) {
        for (const item of selected) {
          if (item.innerHTML !== selectedCountry.name) {
            item.classList.remove('ant-menu-item-selected')
          }
        }
      }
    }
  }, [selectedCountry])

  useEffect(() => {
    console.log('exchangeRates updated', exchangeRates)
  }, [exchangeRates])

  return (
    <Layout className="App" style={{ minHeight: '100vh' }}>

      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu
          theme="dark"
          defaultSelectedKeys={selectedCountry ? selectedCountry.alpha2Code : ''}
          defaultOpenKeys={['countries']}
          mode="inline"
        >
          {countries.length > 0 && buildCountriesMenu(countries, setSelectedCountry, selectedCountry)}
          {countries.length === 0 && (<Menu.Item>Loading Countries...</Menu.Item>)}
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: '0 20px 0 0', justifyContent: 'flex-end', display: 'flex' }}>
          <div style={{marginRight: 20}}>
            <Button type={'primary'} onClick={loadRandomCountry}>Random Country</Button>
          </div>
          {countries.length > 0 && selectedCountry && (
            <div>
              <Select
                showSearch
                placeholder={`Select a country`}
                optionFilterProp={"children"}
                onChange={handleCountrySelect}
                filterOption={(input, Option) =>Option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                style={{width: 200}}
                defaultValue={selectedCountry.name}
                key={selectedCountry.name}
              >
                {countries.map(country => (
                  <Select.Option value={country.name}>
                    {country.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}
        </Header>
        <Content style={{ margin: '0 16px' }}>

          {selectedCountry && exchangeRates && <CountryInfo countries={countries} exchangeRates={exchangeRates} {...selectedCountry}/>}

        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>

    </Layout>
  );
}

export default App;
