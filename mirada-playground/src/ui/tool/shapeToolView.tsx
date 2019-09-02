import * as React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { ShapeTypes } from '../../app/state'
import { getState, setState } from '../../app/store'
import { AbstractComponent } from '../common/component'
import { ShapeTool } from './shapeTool'
import { getTool } from './tool'

export class ShapeToolView extends AbstractComponent {
  render() {
    return (
      <Button.Group toggle size="medium" vertical fluid >
        <Button onClick={e => this.setShape('rectangle')}><Icon name="square outline" />Rectangle</Button>
        <Button onClick={e => this.setShape('rectangle')}><Icon name="paint brush" />Brush</Button>
        <Button onClick={e => this.setShape('rectangle')}><Icon name="ellipsis horizontal" />Ellipse</Button>
      </Button.Group>
    )
  }
  protected setShape(s: ShapeTypes) {
    console.log('VIEW');
    
    setState({ shapesTool: { ...getState().shapesTool, activeShape: s } })
   getTool(ShapeTool.NAME)!.setActive(true)
    // this.getTool()!.setActive(true)
  }

}





