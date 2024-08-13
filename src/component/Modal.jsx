import { XCircleOutline } from "heroicons-react"


function Modal({title,children,onOpen,open}) {
    if(!open) return null
  return (
    <div className="backdrop" onClick={()=>onOpen(false)}>
      <div className="modal">
        <div className="modal__header">
            <h2 className="title">{title}</h2>
            <button > <XCircleOutline className="icon close" onClick={()=>onOpen(false)}/></button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
