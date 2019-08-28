import * as React from 'react'
import { ForkRibbon } from './forkRibbon'
import { Header } from './header'
import './styles.css'
export const App = () => (
  <article>
    <ForkRibbon />
    <Header />
    <div className="gridWrapper">
      <div className="editor">
        <div id="editorContainer" />
      </div>
      <div className="output">
        <canvas id="outputCanvas" width="400" height="400"></canvas>
        <video id="videoInput" width="320" height="240" muted></video>
      </div>
    </div>
    <ForkRibbon />
  </article>
)