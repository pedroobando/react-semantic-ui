import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const PhotoWidgetCropper = ({ setImage, imagePreview }) => {
  const cropperRef = useRef(null);

  const cropImage = () => {
    // if (typeof cropperRef.current.getCroppedCanvas() === 'undefined') {
    //   console.log('salir');
    //   return;
    // }

    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());
    // cropper.current.getCroppedCanvas().toBlob((blob) => {
    cropper.getCroppedCanvas().toBlob((blob) => {
      // console.log(blob);
      setImage(blob);
    }, 'image/jpeg');
  };

  return (
    <Cropper
      ref={cropperRef}
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      // Cropper.js options
      // initialAspectRatio={1}
      aspectRatio={1}
      preview=".img-preview"
      guides={true}
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
    />
  );
};

export default PhotoWidgetCropper;
