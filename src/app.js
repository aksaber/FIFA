import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
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

ReactDOM.render(<Root />, document.getElementById('app'));
