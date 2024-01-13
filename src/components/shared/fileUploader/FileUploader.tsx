import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import IFileUploader from './IFileUploader';
import { acceptImageTypes } from '@/lib/constants';
import uploadIcon from '@/assets/icons/upload.svg';
import { Button } from '@/components/ui/button';
import { convertFileToUrl } from '@/lib/utils';

const FileUploader: React.FC<IFileUploader> = ({
  thumbnailUrl,
  setFiles,
  onChangeHandler,
}) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onChangeHandler(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
    accept: acceptImageTypes,
  });

  return (
    <div
      {...getRootProps({
        multiple: false,
        className:
          'flex justify-center items-center w-full h-72 overflow-hidden rounded-xl bg-primary-50 hover:cursor-pointer',
      })}
    >
      <input
        {...getInputProps({
          multiple: false,
          className: 'cursor-pointer',
        })}
      />
      {thumbnailUrl ? (
        <div className='flex h-full w-full justify-center items-center'>
          {isDragActive ? (
            <p>Just drop it! 🙂</p>
          ) : (
            <img
              src={thumbnailUrl}
              alt='image'
              className='w-full object-cover object-center'
            />
          )}
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col py-5 text-grey-500'>
          {isDragActive ? (
            <p>Just drop it! 🙂</p>
          ) : (
            <>
              <img src={uploadIcon} alt='file upload' />
              <h3 className='mb-2 mt-2'>Drag photo here</h3>
              <p className='p-medium-12 mb-4'>SVG, PNG, JPG</p>
              <Button type='button' className='rounded-full'>
                Select from computer
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
