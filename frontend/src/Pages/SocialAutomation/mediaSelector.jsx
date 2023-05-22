import { useState } from 'react';
import { Modal, Button, Input, Spin } from 'antd';

export function MediaSelector(props) {
    const [visible, setVisible] = useState(false);
    const [media, setMedia] = useState(props.data);
    const [selectedMedia, setSelectedMedia] = useState(null);

    const handleSelectMedia = (file) => {
        setSelectedMedia(file);
        setVisible(false);
        props.onSelect(file);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Button onClick={() => setVisible(true)}>Select from Media</Button>
            <Modal
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                title="Select from Media"
                width={740}
            >
                <div className='flex flex-wrap mt-2 justify-center h-96 overflow-y-scroll'>
                    {media.map(file => (
                        <div className='flex flex-col m-2 hover:shadow-2xl hover:scale-110'>
                            <img
                                src={file.url}
                                style={{ cursor: 'pointer' }}
                                width="150"
                                onClick={() => handleSelectMedia(file.url)}
                            />
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
}
