import React, { useState } from 'react'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import NumberFormatter from 'components/NumberFormatter'
import { isAddress } from 'ethers'
import { styles } from './styles.scss'

function MintViewForm(props) {
    const [toAddress, setToAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [toAddressError, setToAddressError] = useState(false)
    const [toAddressErrorTxt, setToAddressErrorTxt] = useState('')



    return(
      <div className={styles}>
        <form>
          <div className="section">
            <TextInput 
              placeholder="Sample form input 1" 
              value={toAddress}
              onChange={e => setToAddress(e.currentTarget.value)}
              required
              error={toAddressError}
              helperText={toAddressErrorTxt}
            />
          </div>
          <div className="section">
            <TextInput
              placeholder="Sample form input 2"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required  
              variant="standard"
              name="mint-view-form-amount-input"
              InputProps={{
                inputComponent: NumberFormatter
              }}
            />
          </div>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disableElevation
          >
            Form Button
          </Button>
        </form>
      </div>
    )
}
export default MintViewForm
