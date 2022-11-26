import React from 'react'
import PropTypes from 'prop-types'
import { Drawer as MuiDrawer } from '@material-ui/core'
import { styles } from './styles.scss'

const Drawer = (props) => {
  const { children, classes, ...other } = props
  // Fix to ensure drawer is visible on mount
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles}>
      <MuiDrawer
        classes={{
          paper: 'drawer-paper',
          ...classes
        }}
        {...other}
      >
        <div className="drawer-container">
          {children}
        </div>
      </MuiDrawer>
    </div>
  )
}

Drawer.propTypes = {
  classes: PropTypes.shape({}),
  children: PropTypes.node.isRequired
}

Drawer.defaultProps = {
  classes: {}
}

export default Drawer
