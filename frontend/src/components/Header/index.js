import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from 'components/AppBar'
import {
  Paper,
  ClickAwayListener,
  Toolbar,
  Icon,
  IconButton,
  Popper,
  MenuList,
  MenuItem
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Button from 'components/Button'
import {
  Menu,
  MenuOpen
} from '@material-ui/icons'
import { FormattedMessage } from 'react-intl'
import { accountHasLoaded } from 'core/libs/lib-wallet-helpers'
import { styles, menuStyles } from './styles.scss'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
      open: false,
      toggleMobileNav: false
    }
  }

  onNavigationChange = () => {
    this.setState({ toggleMobileNav: false })
  }

  displayWalletSelectModal = () => {
    const { actions } = this.props
    actions.wallet.walletSelect()
  }

  displayArrowIcon = () => {
    const { open } = this.state

    if (open) { return (<ArrowIcon direction="up" color="aqua" />) }
    return (<ArrowIcon direction="down" color="aqua" />)
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false
    })
  }

  handleMenuClick = (event) => {
    const { open } = this.state

    this.setState({
      anchorEl: event.currentTarget,
      open: !open
    })
  }

  resetWallet = () => {
    const { actions } = this.props
    actions.wallet.resetWallet()
    this.handleClose()
  }

  toggleMobileNav = () => {
    const { toggleMobileNav } = this.state
    this.setState({ toggleMobileNav: !toggleMobileNav })
  }

  displayWalletAuthStatus = () => {
    const { onboard, walletProvider } = this.props.wallet
    const { anchorEl, open } = this.state

    if (walletProvider) {
      const { account, walletName } = walletProvider

      return (
        <div>
          <WalletAccount
            address={account.address}
            hasLoaded={accountHasLoaded(walletProvider)}
            type={walletName}
          />
          <IconButton
            aria-haspopup="true"
            color="inherit"
            className="dropdown"
            aria-owns={anchorEl ? 'simple-menu' : null}
            onClick={this.handleMenuClick}
          >
            {this.displayArrowIcon()}
          </IconButton>
          <Popper
            elevation={0}
            placement="bottom"
            open={open}
            onClose={this.handleClose}
            className={menuStyles}
            anchorEl={anchorEl}
          >
            <Paper>
              <ClickAwayListener onClickAway={this.handleClose}>
                <MenuList>
                  <MenuItem onClick={this.resetWallet}>
                    <FormattedMessage id="global.header.menu.resetWallet" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        </div>
      )
    } 

    return (<ProgressIndicator type="linear" />)
  }

  displayLandingPageBtn = () => {
    return (
      <Link
        to="/portfolio"
        href="/portfolio"
        onClick={() => trackEvent('LINK', 'LANDING_CTA', 'Launch App')}
      >
        <Button
          variant="outlined"
          color="primary"
          id="launch-app-btn"
        >
          <Icon className="icon">
            <img src={iconLaunchAppSvg} alt="Launch app icon" />
          </Icon>
        </Button>
      </Link>
    )
  }

  displayRightHeaderBtn = () => {
    const { layout } = this.props
    let rightBtn

    if (layout === 'app') {
      rightBtn = this.displayWalletAuthStatus()
    } else if (layout === 'landing') {
      rightBtn = this.displayLandingPageBtn()
    }

    return rightBtn
  }

  render() {
    const { navLinks, logo } = this.props
    const { toggleMobileNav } = this.state
    const rightBtn = this.displayRightHeaderBtn()
    const menuIcon = toggleMobileNav ? <MenuOpen /> : <Menu />

    return (
      <div className={styles}>
        <AppBar
          elevation={0}
          position="static"
        >
          <Toolbar>
            <Typography variant="title" color="inherit">
              <Link to="/" href="/">
                <span>Main logo goes here</span>
              </Link>
            </Typography>
            <Navigation
              onNavigationChange={this.onNavigationChange}
              navLinks={navLinks}
              toggleMobileNav={toggleMobileNav}
              rightBtn={rightBtn}
            />
            <IconButton
              id="burger"
              onClick={this.toggleMobileNav}
            >
              {menuIcon}
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    onboard: state.onboard,
    wallet: state.wallet,
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch),
      wallet: bindActionCreators(walletActionCreators, dispatch)
    }
  }
}

Header.propTypes = {
  actions: PropTypes.shape({
    ui: PropTypes.shape({}).isRequired,
    wallet: PropTypes.shape({
      resetWallet: PropTypes.func.isRequired,
      walletSelect: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  layout: PropTypes.oneOf(['app', 'landing']).isRequired,
  logo: PropTypes.string.isRequired,
  navLinks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  wallet: PropTypes.shape({
    onboard: PropTypes.shape({}),
    walletProvider: PropTypes.shape({
      walletName: PropTypes.string,
      account: PropTypes.shape({
        address: PropTypes.string
      })
    })
  }).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
