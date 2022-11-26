import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Tabs, Icon } from '@material-ui/core'
import NavLink from '../NavLink'
import { styles } from './styles.scss'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { location, navLinks } = nextProps
    const route = location.pathname.split('/')[1]

    const currentTab = navLinks.findIndex((item) => {
      const itemLink = item.link ? item.link.substring(1) : ''
      if (route === '') { return null }
      return (itemLink === route)
    })

    if (currentTab === -1) {
      return 0
    }

    return { currentTab }
  }

  onChange = (currentTab) => {
    const { onNavigationChange } = this.props
    this.setState({ currentTab })
    onNavigationChange()
  }

  displayNavLinks = () => {
    const { navLinks } = this.props

    return navLinks.map((linkItem, index) => {
      const {
        externalLink,
        label,
        link,
        iconImg
      } = linkItem
      const key = `key-${index}`

      return (
        <NavLink
          key={key}
          label={label}
          link={link}
          externalLink={externalLink}
          icon={
            <Icon className="icon">
              <img src={iconImg} alt={`${label} icon`} />
            </Icon>
          }
          onTabSelect={this.onChange}
        />
      )
    })
  }

  render() {
    const { toggleMobileNav, rightBtn } = this.props
    const { currentTab } = this.state
    const mobileNavDisplay = toggleMobileNav ? 'show dropdown-menu-animation2' : ''

    return (
      <div className={styles}>
        <nav id="main-nav" className={mobileNavDisplay}>
          <Tabs
            aria-label="navigation tabs"
            value={currentTab}
            classes={{
              indicator: 'tab-indicator',
              flexContainer: 'navigation'
            }}
          >
            {this.displayNavLinks()}
          </Tabs>
          <div id="right-button">{rightBtn}</div>
        </nav>
      </div>
    )
  }
}

Navigation.propTypes = {
  onNavigationChange: PropTypes.func.isRequired,
  navLinks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rightBtn: PropTypes.node.isRequired,
  toggleMobileNav: PropTypes.bool.isRequired
}

export default withRouter(Navigation)
