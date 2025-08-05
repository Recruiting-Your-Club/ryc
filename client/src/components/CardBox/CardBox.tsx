import MeatBallMenu from '@assets/images/meatball-menu.svg';
import { ApplicantCard, Button, Divider, Dropdown, Text } from '@components';
import { TextToggle } from '@components/_common';
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
    s_rightSideContainer,
    s_svg,
    s_textToggle,
    s_textToggleLeft,
    s_textToggleRight,
    s_titleGroup,
} from './CardBox.style';
import type { CardBoxProps, MergedStepApplicant } from './types';

function CardBox({
    stepTitle,
    step,
    searchText,
    passedApplicantList,
    failedApplicantList,
    handleOpen,
    handleApplicantStatus,
    statusLabel,
    statusInOwnStep,
    height,
    sx,
}: CardBoxProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [selectedPassApplicantIds, setSelectedPassApplicantIds] = useState<string[]>([]);
    const [selectedFailApplicantIds, setSelectedFailApplicantIds] = useState<string[]>([]);
    const [fail, setFail] = useState<boolean>(false);

    // form hooks
    // query hooks
    // calculated values
    const normalizeQuery = (name: string) => {
        return name.toLowerCase().replace(/\s+/g, '');
    }; // 엄밀히 말하면 util 함수에 해당

    const filteredNames = useCallback(
        (applicantList: MergedStepApplicant[]) => {
            const normalizedQuery = normalizeQuery(searchText);
            return applicantList.filter((applicant) =>
                normalizeQuery(applicant.name).includes(normalizedQuery),
            );
        },
        [searchText],
    );

    // handlers
    const handleSelectAllPass = () => {
        if (selectedPassApplicantIds.length === passedApplicantList.length) {
            setSelectedPassApplicantIds([]);
        } else {
            setSelectedPassApplicantIds(
                passedApplicantList.map((applicant) => applicant.applicantId),
            );
        }
    };
    const handleSelectAllFail = () => {
        if (selectedFailApplicantIds.length === failedApplicantList.length) {
            setSelectedFailApplicantIds([]);
        } else {
            setSelectedFailApplicantIds(
                failedApplicantList.map((applicant) => applicant.applicantId),
            );
        }
    };

    const handlePassCheckbox = (applicantId: string, checked: boolean) => {
        setSelectedPassApplicantIds((prev) =>
            checked ? [...prev, applicantId] : prev.filter((id) => id !== applicantId),
        );
    };
    const handleFailCheckbox = (applicantId: string, checked: boolean) => {
        setSelectedFailApplicantIds((prev) =>
            checked ? [...prev, applicantId] : prev.filter((id) => id !== applicantId),
        );
    };

    const handleToggle = () => {
        setFail((prev) => !prev);
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
                        isChecked={fail}
                        handleToggle={handleToggle}
                        leftSx={s_textToggleLeft(fail, step)}
                        rightSx={s_textToggleRight(fail, step)}
                    />
                    <Dropdown>
                        <Dropdown.Trigger asChild>
                            <Button variant="text" sx={s_meatballButton}>
                                <MeatBallMenu css={s_svg} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content offsetX={6.2} offsetY={10} sx={s_dropdownContent}>
                            <Dropdown.Group>
                                {!fail && (
                                    <>
                                        <Dropdown.Sub>
                                            <Dropdown.SubTrigger inset sx={s_dropdownSubTrigger}>
                                                <Text as="text" type="subCaptionRegular">
                                                    단계 이동
                                                </Text>
                                            </Dropdown.SubTrigger>
                                            <Dropdown.SubContent
                                                align="top"
                                                sx={s_dropdownSubContent}
                                            >
                                                <Dropdown.Group>
                                                    <Dropdown.Item
                                                        inset
                                                        sx={s_dropdownSubItem}
                                                        onClick={() =>
                                                            handleApplicantStatus(
                                                                selectedPassApplicantIds,
                                                                statusLabel[0].status,
                                                            )
                                                        }
                                                    >
                                                        <Text as="text" type="subCaptionRegular">
                                                            {statusLabel[0].label}
                                                        </Text>
                                                    </Dropdown.Item>
                                                    {statusLabel.length === 2 && (
                                                        <>
                                                            <Dropdown.Seperator
                                                                sx={s_dropdownSeparator}
                                                            />
                                                            <Dropdown.Item
                                                                inset
                                                                sx={s_dropdownSubItem}
                                                                onClick={() =>
                                                                    handleApplicantStatus(
                                                                        selectedPassApplicantIds,
                                                                        statusLabel[1].status,
                                                                    )
                                                                }
                                                            >
                                                                <Text
                                                                    as="text"
                                                                    type="subCaptionRegular"
                                                                >
                                                                    {statusLabel[1].label}
                                                                </Text>
                                                            </Dropdown.Item>
                                                        </>
                                                    )}
                                                </Dropdown.Group>
                                            </Dropdown.SubContent>
                                        </Dropdown.Sub>
                                        <Dropdown.Seperator sx={s_dropdownSeparator} />
                                    </>
                                )}
                                <Dropdown.Item
                                    inset
                                    sx={s_dropdownItem}
                                    onClick={() =>
                                        handleApplicantStatus(
                                            fail
                                                ? selectedFailApplicantIds
                                                : selectedPassApplicantIds,
                                            fail ? statusInOwnStep.pass : statusInOwnStep.fail,
                                        )
                                    }
                                >
                                    {fail ? (
                                        <Text as="text" type="subCaptionRegular" color="primary">
                                            합격 처리
                                        </Text>
                                    ) : (
                                        <Text as="text" type="subCaptionRegular" color="warning">
                                            불합격 처리
                                        </Text>
                                    )}
                                </Dropdown.Item>
                                <Dropdown.Seperator sx={s_dropdownSeparator} />
                                <Dropdown.Item inset sx={s_dropdownItem}>
                                    <Text as="text" type="subCaptionRegular">
                                        전체 이메일 보내기
                                    </Text>
                                </Dropdown.Item>
                                <Dropdown.Seperator sx={s_dropdownSeparator} />
                                <Dropdown.Item
                                    inset
                                    sx={s_dropdownItem}
                                    onClick={fail ? handleSelectAllFail : handleSelectAllPass}
                                >
                                    <Text as="text" type="subCaptionRegular">
                                        {(fail
                                            ? selectedFailApplicantIds
                                            : selectedPassApplicantIds
                                        ).length === passedApplicantList.length
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
                {!fail && (
                    <div css={s_cardGroup}>
                        {filteredNames(passedApplicantList).map((applicant) => (
                            <ApplicantCard
                                key={applicant.applicantId}
                                applicant={applicant}
                                checked={(fail
                                    ? selectedFailApplicantIds
                                    : selectedPassApplicantIds
                                ).includes(applicant.applicantId)}
                                onChange={fail ? handleFailCheckbox : handlePassCheckbox}
                                onClick={() => handleOpen(applicant as MergedStepApplicant)}
                            />
                        ))}
                    </div>
                )}
                {fail && (
                    <div css={s_cardGroup}>
                        {filteredNames(failedApplicantList).map((applicant) => (
                            <ApplicantCard
                                key={applicant.applicantId}
                                applicant={applicant}
                                checked={(fail
                                    ? selectedFailApplicantIds
                                    : selectedPassApplicantIds
                                ).includes(applicant.applicantId)}
                                onChange={fail ? handleFailCheckbox : handlePassCheckbox}
                                onClick={() => handleOpen(applicant as MergedStepApplicant)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export { CardBox };
