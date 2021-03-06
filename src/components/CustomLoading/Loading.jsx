import React, { PureComponent } from 'react'
import loading from '../loading'

export default class Loading extends PureComponent {
  constructor(props) {
    super(props)
    loading.show()
  }
  componentWillUnmount() {
    loading.hide()
  }
  render() {
    return <div />
  }
}
