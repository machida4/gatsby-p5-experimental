import React from "react"
import {loadableP5 as P5Wrapper} from './loadable'
import Sketch from './sketch'

export default function P5() {
  return (
    <P5Wrapper sketch={Sketch} />
  )
}
