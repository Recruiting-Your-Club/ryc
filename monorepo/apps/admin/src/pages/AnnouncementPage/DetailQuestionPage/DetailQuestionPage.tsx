import React from 'react';

import InfoIcon from '@ssoc/admin/src/assets/images/info.svg';
import { useMediaQuery } from '@ssoc/hooks';
import { Text, TextArea, Tooltip } from '@ssoc/ui';

import type { DetailQuestionPageProps } from '../types';
import {
    s_detailQuestionContainer,
    s_infoIcon,
    s_labelContainer,
    s_questionStarSx,
    s_questionTitleContainer,
    s_questionTitleSx,
    s_textAreaSx,
    s_textAreaWrapperSx,
} from './DetailQuestion.style';

function DetailQuestionPage({ detailQuestions, containerStyle }: DetailQuestionPageProps) {
    const isTablet = useMediaQuery('tablet');
    return (
        <div css={containerStyle}>
            {detailQuestions.map((question) => {
                return (
                    <div key={question.id} css={s_detailQuestionContainer} tabIndex={-1}>
                        <div css={s_labelContainer}>
                            <div css={s_questionTitleContainer}>
                                <Text type="bodyRegular" noWrap sx={s_questionTitleSx}>
                                    {question.label}
                                </Text>
                                {question.isRequired && (
                                    <Text type="bodyRegular" color="warning" sx={s_questionStarSx}>
                                        *
                                    </Text>
                                )}
                            </div>
                            <Tooltip
                                content={question.subLabel}
                                direction={isTablet ? 'bottomLeft' : 'bottom'}
                            >
                                <InfoIcon css={s_infoIcon} />
                            </Tooltip>
                        </div>
                        <TextArea
                            disabled
                            size="lg"
                            wrapperSx={s_textAreaWrapperSx}
                            textAreaSx={s_textAreaSx}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export { DetailQuestionPage };
