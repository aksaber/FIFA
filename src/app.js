import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Root from './router';

//globe css
import './style/index.styl';
import './style/less.less';
import './style/sass.sass';
import './style/scss.scss';
import './style/home/banner.scss';
import './style/home/fifaheader.css';
import './style/home/fifafooter.scss';
import './style/home/common.css';
import './style/details.scss';

ReactDOM.render(<Root />, document.getElementById('app'));
