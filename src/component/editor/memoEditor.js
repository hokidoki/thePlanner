import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import '../../style/quill.snow.css'
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/ImageResize', ImageResize);
// Quill.on('text-change', function(delta, oldDelta, source) {
//   // if (source == 'api') {
//   //   console.log("An API call triggered this change.");
//   // } else if (source == 'user') {
//   //   console.log("A user action triggered this change.");
//   // }
//   console.log(delta);
//   console.log(oldDelta);
//   console.log(source);
// });

export default class MemoEditor extends Component {


  imageHandleChange(){
    const imgTags = document.querySelectorAll('.quill img');
    const imgTagsLength = imgTags.length;
    const totalImgMaxSize = 5 * 1024 * 1024;
    let imgTagsTotalSize = 0;
    
    for(let i = 0; i < imgTagsLength; i++){
      const fileSize = (imgTags[i].src.length * (3/4)) -2; 
      imgTagsTotalSize += fileSize;
    }
    
    if( imgTagsLength <= 4){
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
      input.onchange = function () {
        const file = input.files[0];
        if(imgTagsTotalSize + file.size < totalImgMaxSize){
          const imgMaxSize = 4 * 1024 * 1024; // 2MB
          const reader = new FileReader();
          if (file.size < imgMaxSize) {
            reader.readAsDataURL(file);
            reader.onload = () => {
              const cursorPosition = this.quill.getSelection().index;
              this.quill.insertEmbed(cursorPosition, 'image', reader.result);
          }}else{
          alert("이미지는 2MB 이하만 가능합니다.");
          return;
        }}else{
          alert("이미지의 총 파일 크기는 10mb를 넘지 못합니다. ");
        }
      }.bind(this)
    }else{
      alert("이미지는 5개 까지만 업로드 가능합니다.");
      return;
    }
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

  
  handleChange = (html,delta,source,editor) => {
    this.props.handleChange(html);
    // console.log(editor.getContents())
    // console.log(delta);
    // console.log(source)
  }

  // dummy(){
  //   console.log(this.getContents());
  // }

 
  render() {
    return (
      <div className="editorContainer">
        <ReactQuill
          ref='editor'
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
