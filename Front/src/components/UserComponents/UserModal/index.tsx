import { useEffect, useRef } from "react"
import { Container } from "./styles"
import { createPortal } from "react-dom"
import { IModalProps } from "./@types"


export const UserModal = ({ toggleModal, children, blockClosing }: IModalProps) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!ref.current) {
                return
            }

            if (!event.target) {
                return
            }

            if (!ref.current.contains(event.target as HTMLElement)) {
                toggleModal()
            }
        }

        window.addEventListener("mousedown", handleClick)

        return () => {
            window.removeEventListener("mousedown", handleClick)
        }
    }, [toggleModal])

    return createPortal(
        <Container>
            <div ref={blockClosing ? null : ref}>
                {children}
            </div>
        </Container>,
        document.body
    )
}