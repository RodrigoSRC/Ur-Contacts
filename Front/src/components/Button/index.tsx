import { forwardRef} from "react"
import { IStyledButtonProps } from "./@types"
import { Container } from "./style"


export const Button = forwardRef<HTMLInputElement, IStyledButtonProps>(({ children, ...rest }) => {
    return(
        <Container {...rest}>
            {children}
        </Container>

    )
})