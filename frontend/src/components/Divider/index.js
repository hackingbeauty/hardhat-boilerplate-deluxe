import React from 'react'
import { Divider as MuiDivider } from '@material-ui/core'
import { styles } from './styles.scss'

const Divider = (props) => {
  const { ...other } = props
  return (
    <div className={styles}>
      <MuiDivider {...other} className="divider" />
    </div>
  )
}

export default Divider
