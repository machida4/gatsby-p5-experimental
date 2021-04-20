export default function Sketch(p) {
  let earthTexture;
  let earth;

  p.preload = function() {
    earthTexture = p.loadImage('../images/stretched_icon.png.');
  }

  p.setup = function() {
    let canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    canvas.elt.oncontextmenu = () => false;

    earth = new Planet(p, 50, 0, 0, earthTexture);
    earth.generateSatellites(2);
    earth.generateParticles(300);
  }

  p.draw = function() {
    p.background(0);

    p.ambientLight(240, 240, 240);
    p.pointLight(255, 255, 255, 0, 0, 0);

    earth.show();
    earth.orbit();
  }
}


class Planet {
  constructor(p, radius, distance, orbitspeed, texture) {
    this.p = p;
    this.radius = radius;
    this.distance = distance;
    this.angle = p.random(p.TWO_PI); 
    this.orbitspeed = orbitspeed;
    this.texture = texture;

    this.v = p.Vector.random3D().mult(this.distance);

    this.satellites = [];
    this.particles = [];
  }

  show() {
    this.p.push();
    this.p.noStroke();

    let v2 = this.p.createVector(1, 0, 1);
    let position = this.v.cross(v2);

    if (this.p.x !== 0 || this.p.y !== 0 || this.p.z !== 0) {
      this.p.rotate(this.angle, position);
    }
    this.p.stroke(255);

    this.p.translate(this.v.x, this.v.y, this.v.z);
    this.p.noStroke();
    this.p.texture(this.texture);
    this.p.sphere(this.radius);

    for (let i = 0; i < this.satellites.length; i++) {
      this.satellites[i].show();
    }

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }

    this.p.pop();
  }

  orbit() {
    this.angle = this.angle + this.orbitspeed;

    for (let i = 0; i < this.satellites.length; i++) {
      this.satellites[i].orbit();
    }

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].orbit();
    }
  }

  generateSatellites(count) {
    this.satellites = [];

    for (let i = 0; i < count; i++) {
      let radius = this.p.random(this.radius / 2.5, this.radius / 1.5);
      let distance = this.p.random(this.radius + radius * 6 , (this.radius + radius) * 6);
      let orbitspeed = this.p.random(-0.05, 0.05);
      this.satellites[i] = new Planet(radius, distance, orbitspeed, this.texture);
    }
  }

  generateParticles(count) {
    this.particles = [];

    for (let i = 0; i < count; i++) {
      let radius = this.p.random(this.radius / 15);
      let distance = this.p.random(this.radius * 2.5, this.radius * 2.6);
      let orbitspeed = this.p.random(0.008, 0.01); 
      if (Math.floor(this.p.random() * 2) === 0) {
        orbitspeed *= -1;
      }
      this.particles[i] = new Particle(radius, distance, orbitspeed, this.texture);
    }
  }
}

class Particle extends Planet {
  constructor(radius, distance, orbitspeed, texture) {
    super(radius, distance, orbitspeed, texture);
    this.v = new this.p.Vector(0.15, this.p.random(0.08, 0.1), 0.0).normalize().mult(this.distance);
  }
}

