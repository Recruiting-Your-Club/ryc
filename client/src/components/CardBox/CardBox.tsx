import MeatBallMenu from '@assets/images/meatball-menu.svg';
import { ApplicantCard, Button, Divider, Dropdown, Text } from '@components';
import { TextToggle } from '@components/_common';
import { Applicant } from '@pages/StepManagementPage/types';
import React, { useCallback, useState } from 'react';
import {
    s_boxContainer,
    s_cardGroup,
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
    s_textToggle,
    s_textToggleLeft,
    s_textToggleRight,
    s_rightSideContainer,
    s_titleGroup,
} from './CardBox.style';
import type { CardBoxProps } from './types';

function CardBox({
    stepTitle,
    step,
    searchText,
    applicantList,
    handleOpen,
    height,
    sx,
}: CardBoxProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
    const [pass, setPass] = useState<boolean>(false);

    // form hooks
    // query hooks
    // calculated values
    const normalizeQuery = (name: string) => {
        return name.toLowerCase().replace(/\s+/g, '');
    }; // 엄밀히 말하면 util 함수에 해당

    const filteredNames = useCallback(
        (applicantList: Applicant[]) => {
            const normalizedQuery = normalizeQuery(searchText);
            return applicantList.filter((applicant) =>
                normalizeQuery(applicant.name).includes(normalizedQuery),
            );
        },
        [searchText],
    );

    // handlers
    const handleSelectAll = () => {
        if (selectedEmails.length === applicantList.length) {
            setSelectedEmails([]);
        } else {
            setSelectedEmails(applicantList.map((applicant) => applicant.email));
        }
    };

    const handleCheckbox = (email: string, checked: boolean) => {
        setSelectedEmails((prev) => (checked ? [...prev, email] : prev.filter((e) => e !== email)));
    };

    const handleToggle = () => {
        setPass((prev) => !prev);
    };

    return (
        <div css={[s_boxContainer(height, step), sx]}>
            <div css={s_titleGroup}>
                <Text as="span" type="captionSemibold">
                    {stepTitle}
                </Text>
                <div css={s_rightSideContainer}>
                    <TextToggle
                        size="sm"
                        sx={s_textToggle(step)}
                        leftText="합격자"
                        rightText="불합격자"
                        isChecked={pass}
                        handleToggle={handleToggle}
                        leftSx={s_textToggleLeft(pass, step)}
                        rightSx={s_textToggleRight(pass, step)}
                    />
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
                                <Dropdown.Item inset sx={s_dropdownItem} onClick={handleSelectAll}>
                                    <Text as="text" type="subCaptionRegular">
                                        {selectedEmails.length === applicantList.length
                                            ? '전체 선택 해제'
                                            : '전체 선택'}
                                    </Text>
                                </Dropdown.Item>
                            </Dropdown.Group>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
            <Divider sx={s_divider} />
            <div css={s_cardGroupWrapper}>
                {!pass && (
                    <div css={s_cardGroup}>
                        {filteredNames(applicantList).map((applicant) => (
                            <ApplicantCard
                                key={applicant.email}
                                applicant={applicant}
                                checked={selectedEmails.includes(applicant.email)}
                                onChange={handleCheckbox}
                                onClick={() => handleOpen(applicant as Applicant)}
                            />
                        ))}
                    </div>
                )}
                {pass && <div css={s_cardGroup}>ㅎㅇ</div>}
            </div>
        </div>
    );
}
export { CardBox };
