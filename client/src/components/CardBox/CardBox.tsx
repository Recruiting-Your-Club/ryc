import MeatBallMenu from '@assets/images/meatball-menu.svg';
import { Divider, Text } from '@components';
import { Button } from '@components/_common';
import { Dropdown } from '@components/_common/Dropdown';
import React from 'react';
import {
    s_boxContainer,
    s_cardGroupWrapper,
    s_divider,
    s_dropdownContent,
    s_dropdownItem,
    s_dropdownSeparator,
    s_dropdownSubContent,
    s_dropdownSubItem,
    s_dropdownSubTrigger,
    s_meatballButton,
    s_svg,
    s_titleGroup,
} from './CardBox.style';
import type { CardBoxProps } from './types';

function CardBox({ stepTitle, step, toggleDropdown, height, children, sx }: CardBoxProps) {
    return (
        <div css={[s_boxContainer(height, step), sx]}>
            <div css={s_titleGroup}>
                <Text as="span" type="captionSemibold">
                    {stepTitle}
                </Text>
                <Dropdown>
                    <Dropdown.Trigger asChild>
                        <Button variant="text" sx={s_meatballButton}>
                            <MeatBallMenu css={s_svg} />
                        </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content offsetX={6} offsetY={8} sx={s_dropdownContent}>
                        <Dropdown.Group>
                            <Dropdown.Sub>
                                <Dropdown.SubTrigger inset sx={s_dropdownSubTrigger}>
                                    <Text as="text" type="subCaptionRegular">
                                        단계 이동
                                    </Text>
                                </Dropdown.SubTrigger>
                                <Dropdown.SubContent align="top" sx={s_dropdownSubContent}>
                                    <Dropdown.Group>
                                        <Dropdown.Item inset sx={s_dropdownSubItem}>
                                            <Text as="text" type="subCaptionRegular">
                                                면접
                                            </Text>
                                        </Dropdown.Item>
                                        <Dropdown.Seperator sx={s_dropdownSeparator} />
                                        <Dropdown.Item inset sx={s_dropdownSubItem}>
                                            <Text as="text" type="subCaptionRegular">
                                                최종 합격
                                            </Text>
                                        </Dropdown.Item>
                                    </Dropdown.Group>
                                </Dropdown.SubContent>
                            </Dropdown.Sub>
                            <Dropdown.Seperator sx={s_dropdownSeparator} />
                            <Dropdown.Item inset sx={s_dropdownItem}>
                                <Text as="text" type="subCaptionRegular">
                                    전체 이메일 보내기
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Seperator sx={s_dropdownSeparator} />
                            <Dropdown.Item inset sx={s_dropdownItem}>
                                <Text as="text" type="subCaptionRegular">
                                    전체 선택
                                </Text>
                            </Dropdown.Item>
                        </Dropdown.Group>
                    </Dropdown.Content>
                </Dropdown>
            </div>
            <Divider sx={s_divider} />
            <div css={s_cardGroupWrapper}>{children}</div>
        </div>
    );
}
export { CardBox };
