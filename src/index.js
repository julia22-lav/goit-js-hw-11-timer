import './styles.css';
import CountdownTimer from './timer.js';

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 22, 2021'),
});

timer.start();
