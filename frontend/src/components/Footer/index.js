import React from 'react'
import gitbookLogoSvg from 'assets/images/logos/logo-gitbook.svg'
import { FormattedMessage } from 'react-intl'
import { styles } from './styles.scss'

const Footer = () => {
  return (
    <div className={styles}>
      <p><FormattedMessage id="global.footer.text" /></p>
      <ul className="social">
        <li>
          <a href="https://github.com/hackingbeauty/hardhat-boilerplate-deluxe" target="_blank" rel="noreferrer">
            <img className="icon" src={gitbookLogoSvg} alt="Gitbook icon" />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Footer
