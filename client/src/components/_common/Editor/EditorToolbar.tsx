import Bold from '@assets/images/text-bold.svg';
import Italic from '@assets/images/text-italic.svg';
import Strikethrough from '@assets/images/text-strikethrough.svg';
import Underline from '@assets/images/text-underline.svg';
import type { CSSObject } from '@emotion/react';
import React, { useState } from 'react';
import { buttonGroup, perButtonCss, svgCss, toolbarContainer } from './Editor.style';
export type Tool = 'bold' | 'italic' | 'strikethrough' | 'underline';
interface ToolbarProps {
    width?: string;
    radius?: string;
    sx?: CSSObject;
}

function EditorToolbar({ width, radius, sx }: ToolbarProps) {
    const formatSvg = [
        { format: 'bold', Svg: Bold },
        { format: 'italic', Svg: Italic },
        { format: 'strikethrough', Svg: Strikethrough },
        { format: 'underline', Svg: Underline },
    ];

    const [toolColor, setToolColor] = useState<Record<Tool, boolean>>({
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
    });

    const handleButtonColor = (button: Tool) => {
        setToolColor((prev) => ({ ...prev, [button]: !prev[button] }));
    };

    return (
        <div css={[toolbarContainer(width, radius), sx]}>
            <div css={buttonGroup}>
                {formatSvg.map(({ format, Svg }) => (
                    <button
                        key={format}
                        onClick={() => handleButtonColor(format as Tool)}
                        css={perButtonCss}
                    >
                        <Svg css={svgCss(toolColor[format as Tool])} />
                    </button>
                ))}
            </div>
            <div css={buttonGroup}></div>
        </div>
    );
}

export { EditorToolbar };
