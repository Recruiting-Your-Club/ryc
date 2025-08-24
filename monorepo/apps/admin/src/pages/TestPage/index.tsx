import { useEditorImageUpload } from '@hooks/useEditorImageUpload';
import { ClubMemberRolePage } from '@pages/ClubMemberRolePage';
import { useState } from 'react';

import { Button, Editor, Stepper } from '@ssoc/ui';

function TestPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [content, setContent] = useState('');

    // 이미지 업로드 처리 훅
    const { isUploading, handleContentChange } = useEditorImageUpload({
        location: 'ANNOUNCEMENT_EDITOR',
    });

    return (
        <div style={{ width: '800px' }}>
            {isUploading && (
                <div
                    style={{
                        padding: '8px',
                        backgroundColor: '#f0f8ff',
                        border: '1px solid #007acc',
                        borderRadius: '4px',
                        marginBottom: '8px',
                    }}
                >
                    이미지를 업로드 중입니다...
                </div>
            )}

            <Editor.Root>
                <Editor.Toolbar />
                <Editor.Textarea
                    value={content}
                    onChange={(newContent) => handleContentChange(newContent, setContent)}
                    height="400px"
                />
            </Editor.Root>

            {/* <Stepper activeStep={activeStep}>
                <Stepper.Step>
                    <Stepper.Label>Step 1</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step>
                    <Stepper.Label>Step 2</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step>
                    <Stepper.Label>Step 3</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step>
                    <Stepper.Label>Step 4</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step>
                    <Stepper.Label>Step 5</Stepper.Label>
                </Stepper.Step>
            </Stepper>
            <div
                style={{
                    display: 'flex',
                    marginTop: '2rem',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    variant="primary"
                    size="s"
                    onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
                >
                    이전
                </Button>
                <Button
                    variant="primary"
                    size="s"
                    onClick={() => setActiveStep((prev) => Math.min(prev + 1, 4))}
                >
                    다음
                </Button>
            </div> */}
        </div>
    );
}
export { TestPage };
