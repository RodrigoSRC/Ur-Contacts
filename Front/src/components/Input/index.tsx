import { forwardRef} from "react"
import { StyledParagraph } from "../../styles/typography"
import { Container }from "./style";
import { IInputProps } from "./@types";


export const Input = forwardRef<HTMLInputElement, IInputProps>(({error, title, ...rest}, ref) => {
    return(
        <Container>
            <StyledParagraph 
            fontItalic="italic"
            >{title}</StyledParagraph>
            
            <input ref={ref} {...rest}/>
            <StyledParagraph className="errorMessage">{error?.message}</StyledParagraph>
        </Container>

    )
})