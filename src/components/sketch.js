import React from "react"

export default function Sketch(p) {
  p.setup = function() {
    p.createCanvas(600, 400, p.WEBGL);
  }

  p.draw = function() {
    p.background(100);
    p.normalMaterial();
    p.noStroke();
    p.push();
    p.box(100);
    p.pop();
  }
}
