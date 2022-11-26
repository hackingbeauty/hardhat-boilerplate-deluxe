import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, bindActionCreators  } from 'redux'
import * as currencyActionCreators  from 'core/actions/actions-currency'
import loadComponentWhenReady from 'core/hocs/hoc-loading-component'
import { FormattedMessage } from 'react-intl'
import { styles } from './styles.scss'

class HomeView extends Component {
  componentDidMount() {
    const { actions } = this.props
    actions.currency.getTradableCurrencies()
    window.scrollTo(0, 0)
  }

  render() {
    const { currency } = this.props

    return (
      <div className={styles}>
        <div className="container">
          <FormattedMessage id="view.home.heading" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currency: state.currency
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      currency: bindActionCreators(currencyActionCreators, dispatch)
    }
  }
}

HomeView.propTypes = {
  currency: PropTypes.shape({
    tradableCurrencies: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }).isRequired,
  actions: PropTypes.shape({
    currency: PropTypes.shape({
      getTradableCurrencies: PropTypes.func.isRequired
    })
  }).isRequired
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  loadComponentWhenReady('provider', 'web3provider')
)(HomeView)
