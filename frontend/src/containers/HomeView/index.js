import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as transactionActionCreators  from 'core/actions/actions-transaction'
import HomeViewForm from './components/HomeViewForm'
import { styles } from './styles.scss'

class HomeView extends Component {
  render() {
    const { provider, transaction } = this.props
    const { transactionSucceeded } = transaction
    const { 
      tokenName,
      totalSupply,
      cappedTokenSupply 
    } = provider

    return (
      <div className={styles}>
        <div className="container">
          <HomeViewForm
            transactionSucceeded={transactionSucceeded}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    provider: state.provider,
    transaction: state.transaction
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      transaction: bindActionCreators(transactionActionCreators, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)