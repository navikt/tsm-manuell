import React, { ReactElement, ReactNode } from 'react'

interface InnrykkProps {
    children: ReactNode
}

const Innrykk = ({ children }: InnrykkProps): ReactElement | null => {
    if (!children) {
        return null
    }

    return <div style={{ marginLeft: '2.5rem' }}>{children}</div>
}

export default Innrykk
