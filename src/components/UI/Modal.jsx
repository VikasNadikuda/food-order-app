import { createPortal } from "react-dom"
import { useRef,useEffect } from "react"
export default function Modal({children,open,className='',onClose}){
    const dialogRef=useRef()
    useEffect(()=>{
        const modal=dialogRef.current // recommended
        if (open) {
            modal.showModal()
        }
        return ()=> modal.close() // cleanup function
    },[open])
    return (
        createPortal(
        <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>,document.getElementById('modal'))
    )
}