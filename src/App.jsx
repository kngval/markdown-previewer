import { useState, useEffect } from 'react';
import './App.css';
import {marked} from 'marked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [mark, setMark] = useState(
    `# Header (H1 size)
## Sub Header (H2 size)
[Link](https://www.example.com)
\`Inline Code\`
\`\`\`
// Code Block
const code = "Hello, World!";
console.log(code);
\`\`\`
- List Item 1
- List Item 2
> Blockquote\n
![Image](https://preview.redd.it/r3lcc7gf64791.png?width=540&format=png&auto=webp&s=9d32ec46f884486fd59dfd01453bf5d07bf30d75)\n
**Bolded Text**`
  );
  const [markedContent, setMarkedContent] = useState('');

  const handleChange = (e) => {
    setMark(e.target.value);
  }

  useEffect(() => {
    // Update the HTML content when the Markdown content changes
    const parsedHtml = marked(mark,  { breaks: true })    
    const responsiveImg = parsedHtml.replace(/<img /g, '<img class="responsive-image" ');

    setMarkedContent(responsiveImg)
  }, [mark]);

  return (
    <>
      <div className="container">
        <h1 className='title'>Markdown Previewer</h1>

        <div className="editor-wrapper">

          <div className="toolbar"><FontAwesomeIcon icon={faEdit} /> Editor</div>
          <textarea id="editor" rows="10" value={mark} onChange={handleChange}></textarea>
        </div>

        <div className="preview-wrapper">
        <div className="toolbar"><FontAwesomeIcon icon={faEye} /> Preview</div>

          <div id='preview' dangerouslySetInnerHTML={{ __html: markedContent }}></div>
        </div>
      </div>
    </>
  );
}

export default App;
