import { useState } from 'react';
import { Modal, Button, Input, Spin } from 'antd';

const API_KEY = 'O2OBDFDdAOTu6BegIMGSErwge5JGN2qY';

export function GifSelector(props) {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=10`)
      .then(response => response.json())
      .then(data => {
        setGifs(data.data);
        setLoading(false);
      })
      .catch(error => console.error('Error searching for GIFs:', error));
  };

  const handleSelectGif = (gif) => {
    setSelectedGif(gif);
    setVisible(false);
    props.onSelect(gif);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>Select Gif</Button>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Input.Search
          style={{marginTop: '2rem'}}
          placeholder="Search for GIFs"
          onSearch={handleSearch}
          value={searchTerm}
          enterButton={false}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <Spin />
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
            {gifs.map(gif => (
              <div key={gif.id} style={{ marginRight: '1rem', marginBottom: '1rem' }}>
                <img
                  src={gif.images.fixed_height.url}
                  alt={gif.title}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSelectGif(gif)}
                />
              </div>
            ))}
          </div>
        )}
      </Modal>
      {/* {selectedGif && (
        <div className='flex justify-center align-middle items-center'>
          <img width={200} height={200} src={selectedGif.images.original.url} alt={selectedGif.title} />
        </div>
      )} */}
    </>
  );
}
