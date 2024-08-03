import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) =>
{
  const [showChildren, setShowChildren] = useState(false)

  const toggleVisibility = () => {
    setShowChildren(!showChildren)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return(
    <div>
      <button onClick={toggleVisibility}>{props.btnLabel}</button>
      {showChildren && (props.children)}
      {showChildren && <button onClick={toggleVisibility}>Cancel</button> }
    </div>
  )
})
export default Togglable