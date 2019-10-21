import React from 'react';
import moment from 'moment';
import styles from './CountDown.scss';

/**
 * 能力：传递一个开始时间，计算倒计时
 * 1、当前时间未到开始时间，展示倒计时
 * 2、当前时间到了  进行中
 * 3、时间超过，活动结束
 */
class CountDown extends React.PureComponent {
  state = {
    // 展示活动状态
    surplus: ''
  };

  componentDidMount() {
    this.computedSurplusTime();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { endHours } = this.props;
    if(endHours !== prevProps.endHours) {
      this.computedSurplusTime();
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  computedSurplusTime() {
    const { endHours } = this.props;
    /**
     * 超过，这活动结束
     */
    if (moment().hour() > endHours) {
      this.setState({
        surplus: '活动已结束'
      });
      return;
    }
    /**
     * 进行中
     */
    if (moment().hour()=== endHours) {
      this.setState({
        surplus: '活动进行中'
      });
      return;
    }
    let diffSeconds = moment().hour(16).startOf('hour').unix() - moment().unix();
    this.computDate(moment(diffSeconds));
    this.interval = setInterval(()=>{
      this.computDate(moment(--diffSeconds));
    }, 1000)
  }

  computDate(newV) {
    const hours = Math.floor(newV / 3600);
    const minutes = Math.floor(newV / 60) % 60;
    const seconds = newV % 60;
    this.setState({
      surplus: hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
    })
  }

  render() {
    const {surplus} = this.state;
    const { endHours } = this.props;
    return (
      <div className={styles['count-down']}>
        <span className={styles['count-down-end-time']}>
          {endHours}点场
        </span>
        <span className={styles['count-down-surplus']}>
          {surplus}
        </span>
      </div>
    );
  }
}

export default CountDown;
