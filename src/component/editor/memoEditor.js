import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import '../../style/quill.snow.css'
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/ImageResize', ImageResize);

export default class MemoEditor extends Component {

    state = {
        theme : 'snow',
        modules : {
            toolbar: [
              [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
              [{size: []}],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, 
               {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image', 'video'],
              ['clean']
            ],
            imageResize: {
                displayStyles: {
                  backgroundColor: 'black',
                  border: 'none',
                  color: 'white'
                },
                modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                          }   
            ,
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: false,
            }
          },
        format : [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video'
          ]
    }

    handleChange = (html)=> {
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
