import React, { Component, PropTypes } from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import Styles from './imgUpload.less';

class ImgUpload extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({
    previewVisible: false 
  })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    const { onComplete } = this.props;
    this.setState({ fileList });
    fileList = fileList.filter((file) => {
      if (file.response) {
        if (file.response.success) {
          onComplete(file.response.data);
        } else {
          message.error(file.response.msg);
        }
      }
    })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = this.props.initUrl ? (
      <div><img src={this.props.initUrl} /></div>
      ) : (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    )

    return (
      <div className={this.props.initUrl ? Styles.haveImg : null}>
        <Upload
          action="/api/public/image/upload"
          listType="picture-card"
          fileList={fileList}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}


export default ImgUpload;