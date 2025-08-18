import MeatBallMenu from '@assets/images/meatball-menu.svg';
import { ApplicantCard } from '@components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Button, Divider, Dropdown, Text, TextToggle } from '@ssoc/ui';

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
    onEmailDialogOpen,
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
    const searchApplicants = useCallback(
        (applicantList: MergedStepApplicant[]) => {
            return applicantList.filter((applicant) =>
                applicant.name.toLowerCase().includes(searchText.toLowerCase()),
            );
        },
        [searchText],
    );

    const selectedGroup = useMemo(
        () =>
            fail
                ? {
                      list: failedApplicantList,
                      ids: selectedFailApplicantIds,
                      setIds: setSelectedFailApplicantIds,
                  }
                : {
                      list: passedApplicantList,
                      ids: selectedPassApplicantIds,
                      setIds: setSelectedPassApplicantIds,
                  },
        [
            fail,
            failedApplicantList,
            selectedFailApplicantIds,
            passedApplicantList,
            selectedPassApplicantIds,
        ],
    );

    const isDisabled = selectedGroup.list.length === 0;

    const getEmailTargetType = (): string => {
        if (step === 'document') return fail ? 'documentFailed' : 'documentPending';
        if (step === 'interview') return fail ? 'interviewFailed' : 'interviewPending';
        return fail ? 'finalFailed' : 'finalPassed';
    };

    // handlers
    const handleSelectAll = () => {
        if (selectedGroup.ids.length === selectedGroup.list.length) {
            selectedGroup.setIds([]);
        } else {
            selectedGroup.setIds(selectedGroup.list.map((applicant) => applicant.applicantId));
        }
    };

    const handleCheckbox = useCallback(
        (applicantId: string, checked: boolean) => {
            selectedGroup.setIds((prev) =>
                checked ? [...prev, applicantId] : prev.filter((id) => id !== applicantId),
            );
        },
        [selectedGroup],
    );

    const handleToggle = () => {
        setFail((prev) => !prev);
    };

    //effects
    useEffect(() => {
        setSelectedPassApplicantIds([]);
        setSelectedFailApplicantIds([]);
    }, [passedApplicantList, failedApplicantList]);

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
                        leftText={step.startsWith('final') ? '합격자' : '대기자'}
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
                                            <Dropdown.SubTrigger
                                                inset
                                                disabled={isDisabled}
                                                sx={s_dropdownSubTrigger}
                                            >
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
                                    disabled={isDisabled}
                                    onClick={() =>
                                        handleApplicantStatus(
                                            selectedGroup.ids,
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
                                {getEmailTargetType().includes('interviewPending') && (
                                    <>
                                        <Dropdown.Seperator sx={s_dropdownSeparator} />
                                        <Dropdown.Item
                                            inset
                                            sx={s_dropdownItem}
                                            onClick={() => {
                                                onEmailDialogOpen(
                                                    getEmailTargetType(),
                                                    selectedGroup.ids,
                                                    true,
                                                );
                                            }}
                                            disabled={isDisabled}
                                        >
                                            <Text as="text" type="subCaptionRegular">
                                                면접 일정 보내기
                                            </Text>
                                        </Dropdown.Item>
                                    </>
                                )}
                                <Dropdown.Seperator sx={s_dropdownSeparator} />
                                <Dropdown.Item
                                    inset
                                    sx={s_dropdownItem}
                                    onClick={() => {
                                        onEmailDialogOpen(getEmailTargetType(), selectedGroup.ids);
                                    }}
                                    disabled={isDisabled}
                                >
                                    <Text as="text" type="subCaptionRegular">
                                        이메일 보내기
                                    </Text>
                                </Dropdown.Item>
                                <Dropdown.Seperator sx={s_dropdownSeparator} />
                                <Dropdown.Item
                                    inset
                                    sx={s_dropdownItem}
                                    onClick={handleSelectAll}
                                    disabled={isDisabled}
                                >
                                    <Text as="text" type="subCaptionRegular">
                                        {selectedGroup.ids.length === selectedGroup.list.length
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
                <div css={s_cardGroup}>
                    {searchApplicants(selectedGroup.list)
                        .slice()
                        .sort((prev, next) => (next.averageScore ?? 0) - (prev.averageScore ?? 0))
                        .map((applicant) => (
                            <ApplicantCard
                                key={applicant.applicantId}
                                applicant={applicant}
                                checked={selectedGroup.ids.includes(applicant.applicantId)}
                                onChange={handleCheckbox}
                                onClick={() => handleOpen(applicant as MergedStepApplicant)}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
export { CardBox };
