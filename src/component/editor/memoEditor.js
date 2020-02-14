import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import '../../style/quill.snow.css'
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/ImageResize', ImageResize);

export default class MemoEditor extends Component {


  imageHandleChange(){
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = function () {
      const file = input.files[0];
      const imgMaxSize = 1 * 1024 * 1024; // 2MB
      const reader = new FileReader();
      if (file.size < imgMaxSize) {
        reader.readAsDataURL(file);
        console.log(file)
        reader.onload = () => {
          const cursorPosition = this.quill.getSelection().index;
          this.quill.insertEmbed(cursorPosition, 'image', reader.result)
        }
      } else {
        alert("이미지는 2MB 이하만 가능합니다.");
        return;
      }
    }.bind(this)
  }

  state = {
    theme: 'snow',
    modules: {
      toolbar : {
        container : [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image', 'video'],
          ['clean']
        ],
        handlers :{
          image : this.imageHandleChange
        }
      }
      ,
      imageResize: {
        displayStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: 'white'
        },
        modules: ['Resize', 'DisplaySize', 'Toolbar']
      }
      ,
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
    },
    format: [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]
  }

  handleChange = (html) => {
    this.props.handleChange(html);
  }

 
  render() {
    return (
      <div className="editorContainer">
        <ReactQuill
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.props.editorHtml}
          modules={this.state.modules}
          formats={this.state.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
        />
      </div>
    )
  }
}
