import React, { forwardRef } from 'react'
import { Icon, IconProps } from '.'

const loadedSet = new Set<string>()

export default function createFontIconfont(scriptUrl: string) {
    if (
        typeof scriptUrl === 'string'
        && scriptUrl.length > 0
        && !loadedSet.has(scriptUrl)
    ) {
        const script = document.createElement('script')
        script.setAttribute('src', scriptUrl)
        script.setAttribute('data-namespace', scriptUrl)
        document.body.appendChild(script)
        loadedSet.add(scriptUrl)
    }
  
    const Iconfont = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
        const { type, ...rest } = props
        return (
            <Icon {...rest} ref={ref}>
                { type ? <use xlinkHref={`#${type}`} /> : null }
            </Icon>
        )
    })
    
    return Iconfont
}
