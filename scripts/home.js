import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// vertex shader source
const vertexParticleShader = `
uniform float uTime;

varying vec3 vPos;

float PI = 3.14159265359;

attribute float number;

float a = 300.0;
float b = 280.0;

void main(){
  vec3 pos = position.xyz;
  
  pos.x = (a + b * cos(number + uTime)) * cos(number * PI / 180.0 + uTime);
  pos.z = (a + b * cos(number + uTime)) * sin(number * PI / 180.0 + uTime);
  pos.y = b * sin(number + uTime);
  
  vPos = pos;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  
  //gl_PointSize = 60.0 * (120.0 / - mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}

`

// fragment shader source
const fragmentParticleShader = `
uniform float uTime;

varying vec3 vPos;

void main () {
  //float f = length(gl_PointCoord - vec2(0.5, 0.5));
  //if (f > 0.1) discard;
  
  gl_FragColor = vec4(0.0, 0.0, 0.0, 0.4);
}
`

/**
 * Mouse class
 */
class Mouse {
  constructor (sketch) {
    this.sketch = sketch

    this.initialize()
  }

  initialize () {
    this.mouse = new THREE.Vector3()
    this.touchStart = new THREE.Vector3()
    this.touchMove = new THREE.Vector3()
    this.touchEnd = new THREE.Vector3()

    this.delta = 1

    this.setupEvents()
  }

  setupEvents () {
    this.sketch.renderer.domElement.addEventListener(
      'mousemove',
      this.onMousemove.bind(this),
      false
    )
    this.sketch.renderer.domElement.addEventListener(
      'touchstart',
      this.onTouchstart.bind(this),
      false
    )
    this.sketch.renderer.domElement.addEventListener(
      'touchmove',
      this.onTouchmove.bind(this),
      false
    )
    this.sketch.renderer.domElement.addEventListener(
      'touchend',
      this.onTouchend.bind(this),
      false
    )
    this.sketch.renderer.domElement.addEventListener(
      'onWheel',
      this.onWheel.bind(this),
      false
    )
  }

  onMousemove (e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    this.mouse.z = 0
  }

  onTouchstart (e) {
    const touch = e.targetTouches[0]

    this.touchStart.x = touch.pageX
    this.touchStart.y = touch.pageY
    this.touchStart.z = 0.0

    this.mouse.x = (touch.pageX / window.innerWidth) * 2 - 1
    this.mouse.y = -(touch.pageY / window.innerHeight) * 2 + 1
    this.mouse.z = 0
  }

  onTouchmove (e) {
    const touch = e.targetTouches[0]

    this.touchMove.x = touch.pageX
    this.touchMove.y = touch.pageY
    this.touchMove.z = 0.0

    this.touchEnd.x = this.touchStart.x - this.touchMove.x
    this.touchEnd.y = this.touchStart.y - this.touchMove.y
    this.touchEnd.z = 0.0

    this.mouse.x = (touch.pageX / window.innerWidth) * 2 - 1
    this.mouse.y = -(touch.pageY / window.innerHeight) * 2 + 1
    this.mouse.z = 0

    if (this.touchMove.y < this.touchStart.y) {
      this.delta += (this.touchEnd.y - this.touchStart.y) * 0.0001
    } else {
      this.delta -= (this.touchEnd.y - this.touchStart.y) * 0.0001
    }
  }

  onTouchend (e) {
    this.touchStart.x = null
    this.touchStart.y = null
    this.touchStart.z = null

    this.touchMove.x = null
    this.touchMove.y = null
    this.touchMove.z = null

    this.touchEnd.x = null
    this.touchEnd.y = null
    this.touchEnd.z = null
  }

  onWheel (e) {
    this.delta -= e.deltaY * 0.01
  }
}

/**
 * class Sketch
 */
export default class Sketch {
  constructor () {
    this.createCanvas()
    this.setupEvents()

    this.time = new THREE.Clock(true)
    this.mouse = new Mouse(this)

    this.initialize()
  }

  createCanvas () {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗鋸齒
      alpha: true
    })

    document.getElementById('sketch').appendChild(this.renderer.domElement)
  }

  initialize () {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }

    this.width = Math.ceil(window.innerWidth)
    this.height = Math.ceil(window.innerHeight)

    // 創建場景
    this.scene = new THREE.Scene()

    this.setupCanvas()
    // 設置相機
    this.setupCamera()
    // 設置環境光線
    this.setupLight()
    this.setupShape()

    this.draw()
  }

  setupCanvas () {
    this.renderer.setSize(this.width, this.height)
    // 設置設備像素比率
    this.renderer.setPixelRatio(3.0)
    // this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setClearColor(0xFFFFFF, 5.0)

    // this.renderer.domElement.style.position = "fixed";
    // this.renderer.domElement.style.top = "0";
    // this.renderer.domElement.style.left = "0";
    this.renderer.domElement.style.width = '100%'
    this.renderer.domElement.style.height = '100%'
    this.renderer.domElement.style.zIndex = '0'
    this.renderer.domElement.style.outline = 'none'
    // console.log(this.renderer.domElement.style);
  }

  setupCamera () {
    // 相機遠近
    const fov = 10000
    const fovRadian = (fov / 2) * (Math.PI / 180)

    this.dist = this.height / 2 / Math.tan(fovRadian)

    // 長度和寬度比
    // 默認採用瀏覽器  返回以像素為單位的窗口內部寬度和高度
    // 參數1. 垂直相機的視野, 在視野以外的東西不會被選染製畫面
    // 參數2. 相機可以看到的視野外觀比例，注意它是一個寬除高的值
    // 參數3. 接近相機的平片, 當物件比此值更靠近畫面時, 該物件不被渲染
    // 參數4. 遠相機的平面, 當物件與相機的距離大於此值時, 該物件不被渲染
    this.camera = new THREE.PerspectiveCamera(
      fov, // 相機的垂直視野
      this.width / this.height, // 相機的外觀比例
      0.01, // 接近的相機視體平面距離值
      this.dist * 5 // 遠的相機視體平面距離值
    )

    this.camera.position.set(0, 0, this.dist)
    this.camera.lookAt(new THREE.Vector3())

    this.scene.add(this.camera)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // 縮放
    this.controls.enableZoom = false
    // 旋轉
    this.controls.enableRotate = false
    // 平移
    this.controls.enablePan = false
  }

  updateCamera (time) {
    this.camera.position.set(
      Math.cos(-time * 0.1) * this.dist,
      Math.sin(time * 0.1) * this.dist,
      Math.sin(-time * 0.1) * this.dist
    )
    this.camera.lookAt(new THREE.Vector3())
  }

  setupLight () {
    // 燈光
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF)
    this.scene.add(this.directionalLight)

    // 點燈光
    this.spotLight = new THREE.SpotLight(0xFFFFFF)
    // 點燈光位置
    this.spotLight.position.set(this.dist, this.dist, this.dist)
    // 點燈光加到場景中
    this.scene.add(this.spotLight)
  }

  setupShape () {
    this.shapes = []
    const s = new Shape(this)
    this.shapes.push(s)
  }

  draw () {
    const time = this.time.getElapsedTime()

    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].render(time)
    }

    this.renderer.render(this.scene, this.camera)

    this.animationId = requestAnimationFrame(this.draw.bind(this))
  }

  setupEvents () {
    window.addEventListener('resize', this.onResize.bind(this), false)
  }

  onResize () {
    this.initialize()
  }
}

/**
 * shape class
 */
class Shape {
  /**
   * @constructor
   * @param {object} sketch - canvas
   */
  constructor (sketch) {
    this.sketch = sketch

    this.initialize()
  }

  /**
   * initialize shape
   */
  initialize () {
    this.number = 3500
    this.particleGeometry = new THREE.BufferGeometry()
    this.positions = new Float32Array(this.number * 3)
    this.numbers = new Float32Array(this.number)

    for (let i = 0; i < this.number; i++) {
      this.positions.set([0, 0, 0], i * 3)
    }

    for (let i = 0; i < this.number; i++) {
      this.numbers.set([i], i)
    }

    this.particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(this.positions, 3)
    )
    this.particleGeometry.setAttribute(
      'number',
      new THREE.BufferAttribute(this.numbers, 1)
    )

    this.particleMaterial = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { type: 'f', value: 0 },
        uResolution: {
          type: 'v2',
          value: new THREE.Vector2(this.sketch.width, this.sketch.height)
        }
      },
      // blending: THREE.AdditiveBlending,
      transparent: true,
      vertexShader: vertexParticleShader,
      fragmentShader: fragmentParticleShader
    })

    this.particlePoint = new THREE.Line(
      this.particleGeometry,
      this.particleMaterial
    )
    this.sketch.scene.add(this.particlePoint)
  }

  updateParameters (time) {
    this.particlePoint.material.uniforms.uTime.value = time
  }

  /**
   * render shape
   * @param {number} time - time
   */
  render (time) {
    this.updateParameters(time)
  }
}

// avoid call new class cause error define new function to export
export function InitSketch () {
  return new Sketch()
}
