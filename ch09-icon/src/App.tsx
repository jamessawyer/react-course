import createFontIconfont from "./components/Icon/createFontIconfont"
import { IconAdd } from "./components/Icon/icons/IconAdd"
import { IconEmail } from "./components/Icon/icons/IconEmail"

// 这个是阿里巴巴的字体图标 更改颜色有点问题 后面再研究
const IconFont = createFontIconfont('//at.alicdn.com/t/c/font_4757670_ib4jemy3ni.js')


function App() {

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div>
          <hr />
          <h1>基础用法</h1>
          <IconAdd />
          <IconEmail />
        </div>
        
        <div>
          <hr />
          <h1>属性</h1>
          <IconAdd size="40px" />
          <IconEmail spin  />
          <IconEmail style={{ color: 'pink', fontSize: '40px' }} />
        </div>

        <div>
          <hr />
          <h1>Font Icon</h1>
          <IconFont type="icon-arrow" size="40px" />
          <IconFont type="icon-home" size="40px" style={{ color: 'red' }} />
        </div>
      </div>
    </>
  )
}

export default App
