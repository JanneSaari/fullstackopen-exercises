import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                {props.text ? 
                    <p onClick={toggleVisibility}>
                        {props.text}
                    </p>
                    : ''
                }
                {props.buttonLabel ?
                    <button onClick={toggleVisibility}>{props.buttonLabel ? props.buttonLabel : 'show more'}</button> 
                    : ''
                }
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>{props.cancelLabel ? props.cancelLabel : 'show less'}</button>
            </div>
        </div>
    )
})

export default Togglable