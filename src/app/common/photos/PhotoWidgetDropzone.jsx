import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';

const PhotoWidgetDropzone = ({ setFiles }) => {
  const dropzoneStyle = {
    border: 'dashed 3px #eee',
    borderRadius: '5%',
    paddingTop: '30px',
    textAlign: 'center',
  };

  const dropzoneActive = {
    border: 'dashed 3px green',
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dropzoneStyle, ...dropzoneActive } : dropzoneStyle}>
      <input {...getInputProps()} />
      {/* {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )} */}

      <Icon name="upload" size="huge" />
      <Header content="Drop image here" />
    </div>
  );
};

export default PhotoWidgetDropzone;
