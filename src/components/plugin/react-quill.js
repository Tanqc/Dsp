import ReactQuill from 'react-quill';
/* 
 * Simple editor component that takes placeholder text as a prop 
 */
class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: '' }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange (html) {
    const { onComplete } = this.props;
  	this.setState({ editorHtml: html }, () => {
      onComplete(html)
    });
  }
  
  render () {
    return (
      <ReactQuill 
        theme={'snow'}
        onChange={this.handleChange}
        value={this.state.editorHtml || this.props.initVal}
        modules={Editor.modules}
        formats={Editor.formats}
        placeholder={this.props.placeholder}
       />
     )
  }
}

/* 
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    ['bold'],
    ['link', 'image'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['clean']
  ]
}
/* 
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
Editor.formats = [
  'link', 'image', 'bold', 'list', 'bullet'
]

/* 
 * PropType validation
 */
Editor.propTypes = {
  placeholder: React.PropTypes.string,
}


/* 
 * Render component on page
 */
// ReactDOM.render(
//   <Editor placeholder={'Write something...'}/>, 
//   document.querySelector('.app')
// )

export default Editor;
