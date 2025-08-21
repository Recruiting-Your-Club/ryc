import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function PreivewStep() {
    const [activeTab, setActiveTab] = useState<string>('모집공고');
    const { clubId } = useParams();

    return (
        <div>
            <div>
                <div></div>
            </div>
        </div>
    );
}

export { PreivewStep };
