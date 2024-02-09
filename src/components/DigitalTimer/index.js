// Write your code here
import {Component} from 'react'
import './index.css'

let time = 60
let k = 25
let seconds = 0
class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {isStart: true, ini: 25, min: k, sec: seconds, en: true}
  }

  tick = () => {
    const {min, sec, ini} = this.state
    const m = sec === 0 ? min - 1 : min
    time = time === 0 ? 59 : time - 1
    this.setState({min: m, sec: time})
    if (min === 0 && time === 0) {
      clearInterval(this.interval)
      k = ini
      this.setState(prevState => ({isStart: !prevState.isStart, en: true}))
    }
  }

  buttImageFunc = () => {
    const {isStart} = this.state
    if (isStart) {
      this.tick();
      this.interval = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.interval)
    }

    this.setState(prevState => ({isStart: !prevState.isStart, en: false}))
  }

  incrementFunc = () => {
    this.setState(prevState => {
      return {ini: prevState.ini + 1, min: prevState.ini + 1}
    })
  }

  decrementFunc = () => {
    const {ini} = this.state
    if (ini > 25) {
      this.setState(prevState => {
        return {ini: prevState.ini - 1, min: prevState.ini - 1}
      })
    }
  }

  resetFunc = () => {
    const {ini} = this.state
    clearInterval(this.interval)
    time = 60
    k = ini
    seconds = 0
    this.setState({isStart: true, ini:25, min: 25, sec: seconds, en: true})
  }

  render() {
    const {isStart, min, ini, sec, en} = this.state
    const text = isStart ? 'Start' : 'Pause'
    const img = isStart
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    const alt = isStart ? 'play icon' : 'pause icon'
    const inText = isStart ? 'Paused' : 'Running'
    const usec = sec < 10 ? 0 + `${sec}` : sec
    const umin = min < 10 ? 0 + `${min}` : min
    const inc = en && this.incrementFunc
    const dec = en && this.decrementFunc

    return (
      <div className="main-con">
        <div className="bg">
          <h1 className="heading"> Digital Timer </h1>
          <div className="x space">
            <div className="con">
              <div className="white-con">
                <h1 className="para1">
                  {' '}
                  {umin}:{usec}{' '}
                </h1>
                <p className="para2"> {inText} </p>
              </div>
            </div>

            <div className="alig y">
              <div className="x">
                <div className="x z">
                  <button className="para butt1 x" onClick={this.buttImageFunc}>
                    <img src={img} alt={alt} className="icon" />
                    {text}
                  </button>
                </div>

                <div className="x">
                  <button className="butt1 para x" onClick={this.resetFunc}>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="icon"
                    />
                    Reset
                  </button>
                </div>
              </div>
              <p className="timer"> Set Timer limit </p>

              <div className="x z">
                <button className="operator opButt" onClick={dec}>
                  {' '}
                  -
                </button>
                <p className="butt"> {ini} </p>
                <button className="operator opButt" onClick={inc}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
