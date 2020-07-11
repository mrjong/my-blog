import React from 'react'
import { Button, Switch } from 'antd'
import styles from './index.less'

export interface HelloProps {
  compiler: string
  framework: string
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class Hello extends React.Component<HelloProps, unknown> {
  render(): JSX.Element {
    return (
      <div>
        <h1 className={styles.title}>
          Hello from {this.props.compiler} and {this.props.framework} !
        </h1>
        <Button type="primary">你好</Button>
        <Switch defaultChecked />
      </div>
    )
  }
}
