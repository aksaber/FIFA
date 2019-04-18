import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Upload,
  message,
  Button,
  Input
} from 'antd';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class UserInformation extends Component {
  render() {
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div>
        <div className="title">用户信息</div>
        <div className="subTitle">头像</div>
        <div className="clearAfter">
          <img
            src=""
            width={140}
            height={140}
            className="left"
            style={{borderRadius: '50%', marginRight: 50}}
          />
          <div className="left upload" style={{marginTop: 70}}>
            <Input disabled style={{marginRight: 20, width: 300}} />
            <Upload {...props}>
              <Button className="userBtn">浏览</Button>
            </Upload>
          </div>
        </div>
        <div className="subTitle">昵称</div>
        <Input
          value="老脑"
          name="userName"
        />
        <Button type="primary" style={{marginTop: 50}}>保存</Button>
      </div>
    );
  }
}

export default UserInformation;
