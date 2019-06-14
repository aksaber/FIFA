import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Upload,
  message,
  Button,
  Input, Avatar
} from 'antd';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class UserInformation extends Component {
  state = {
    fileLists: [],
    userName: this.props.home.userInfo.name
  };

  componentDidMount() {
    const {changeRoute} = this.props;
    changeRoute('userInformation');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.home.userInfo) {
      this.setState({userName: nextProps.home.userInfo.name});
    }
  }

  //绑定input值
  _changeValue = (event) => {
    const o = {};
    o[event.target.name] = event.target.value;
    this.setState(o);
  };

  //修改用户头像、昵称
  updateUserInfo = () => {
    const {userName, fileLists} = this.state;
    axios.post('/user/member/update', {
      name: userName,
      headPortraitUrl: fileLists.length > 0 ? fileLists[0].response.data : null
    }).then(res => {
      const {data} = res;
      if (data.code === '0') {
        message.success('头像昵称已修改');
        const {getUserInfo} = this.props;
        //获取用户个人信息
        axios.get('/user/member/getUserInfo').then(res2 => {
          if (res2.data.code === '0') {
            getUserInfo(res2.data.data);
          } else {
            message.warning(res2.data.msg);
          }
        }).catch((err) => {
          message.error(`${err}`);
        });
      } else {
        message.warning(data.msg);
      }
    });
  };

  render() {
    const {userName} = this.state;
    const {home: {screenW}} = this.props;
    const self = this;
    let actionUrl = '';
    if (process.env.NODE_ENV === 'development') {
      actionUrl = 'http://192.168.1.115:9081/user/upload/uploadHeadImg';
    } else if (process.env.NODE_ENV === 'production') {
      actionUrl = `${window.configurl.BASE_API}/user/upload/uploadHeadImg`;
    }
    const props = {
      name: 'file',
      action: actionUrl,
      accept: '.png, .jpg, .jpeg, .gif',
      listType: 'picture',
      headers: {
        authorization: 'authorization-text',
        // token: this.props.home.token
      },
      beforeUpload(info) {
        //限制1M以内
        if (info.size >= 1024000) {
          message.warning('上传头像应在1M以内');
          return false;
        }
      },
      onChange(info) {
        let {fileList} = info;
        //上传列表数量的限制为1
        fileList = fileList.slice(-1);
        //读取远程路径并显示链接
        fileList = fileList.map((file) => {
          if (file.response) {
            file.url = file.response.data;
          }
          return file;
        });
        self.setState({
          fileLists: fileList
        });
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 图片上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 图片上传失败`);
        }
      },
    };

    const {fileLists} = this.state;

    return (
      <div>
        <div className="title">用户信息</div>
        <div className="subTitle">头像</div>
        <div className="clearAfter">
          {this.props.home.userInfo.headPortraitUrl ? <img
            src={this.props.home.userInfo.headPortraitUrl}
            width={140}
            height={140}
            className="left"
            style={{borderRadius: '50%', marginRight: 50}}
          /> : <Avatar
            shape="circle"
            icon="user"
            className="avator_user"
            style={{
              fontSize: 93,
              width: 110,
              height: 110,
              float: screenW < 768 ? '' : 'left',
              marginRight: screenW < 768 ? '' : 50
            }}
          />}
          <div className="left upload" style={{marginTop: screenW < 768 ? 30 : 70}}>
            <Input
              disabled
              style={{marginRight: 20, width: 300, display: screenW < 768 ? 'none' : 'block'}}
              value={fileLists.length > 0 ? fileLists[0].name : ''}
            />
            <Upload {...props}>
              <Button
                className="userBtn"
                style={{display: fileLists.length > 0 ? 'none' : 'block', marginTop: 15}}
              >浏览</Button>
            </Upload>
          </div>
        </div>
        <div className="clearAfter">
          <div className="subTitle">昵称</div>
          <Input
            style={{width: screenW < 768 ? '100%' : 400, display: 'block'}}
            value={userName}
            name="userName"
            onChange={this._changeValue}
          />
          <Button
            type="primary"
            style={{
              marginTop: 50,
              background: '#0065E0',
              width: screenW < 768 ? '100%' : ''
            }}
            onClick={this.updateUserInfo}
          >保存</Button>
        </div>
      </div>
    );
  }
}

export default UserInformation;
