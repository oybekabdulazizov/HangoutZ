import { Dispatch, SetStateAction } from 'react';

export default interface IFileUploader {
  thumbnailUrl: string;
  onChangeHandler: (url: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
}
