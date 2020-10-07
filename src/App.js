
import React, {useState, useEffect} from 'react'
import {Alert, Button, DatePicker, message} from 'antd'
import {Layout, Menu, Breadcrumb} from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'

import './App.less'
import "antd/dist/antd.less"

import CountryInfo from './CountryInfo'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu;

/**
 * Get countries from API
 * @returns {Promise<Response|void>}
 */
const getCountries = async () => {
  return await fetch('https://restcountries.eu/rest/v2/all')
    .then(result => result.json())
    .catch(e => console.error(e))
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
    <SubMenu key="countries" icon={<UserOutlined />} title="Countries">
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

  useEffect(() => {
    getCountries()
      .then(result => {
        setCountries(result)
        setSelectedCountry(result[Math.floor(Math.random() * result.length)])
      })
  }, [])

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [selectedCountry])

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
        <Header className="site-layout-background" style={{ padding: '10px 0' }} />
        <Content style={{ margin: '0 16px' }}>
          {selectedCountry && <CountryInfo {...selectedCountry}/>}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
