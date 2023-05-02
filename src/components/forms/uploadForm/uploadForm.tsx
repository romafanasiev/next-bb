import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formFieldNames } from '@constants';
import { TextField } from 'components';
import { uploadTrackValidation } from 'utils';

import type { IFormProps, TUploadForm } from 'types';

const {
  cover,
  preview,
  fullVersion,
  title,
  bpm,
  tags,
  price,
  key,
  exclusiveVersion,
} = formFieldNames;

export const UploadForm = ({onSubmit,}: Omit<IFormProps<TUploadForm>, 'validation'>) => {
  const { register, handleSubmit } = useForm<TUploadForm>({
    resolver: zodResolver(uploadTrackValidation),
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="file"
        register={register}
        name={cover}
        placeholder="Add track cover"
      />
      <TextField
        type="file"
        register={register}
        name={preview}
        placeholder="Add track preview"
      />
      <TextField
        type="file"
        register={register}
        name={fullVersion}
        placeholder="Add track full version"
      />
      <TextField
        type="file"
        register={register}
        name={exclusiveVersion}
        placeholder="Add exclusive version"
      />
      <TextField register={register} name={title} placeholder="Track title" />
      <TextField register={register} name={key} placeholder="Music Key" />
      <TextField register={register} name={bpm} placeholder="Bpm" />
      <TextField register={register} name={tags} placeholder="Tags" />
      <TextField register={register} name={price} placeholder="Price" />

      <button type="submit">upload track</button>
    </form>
  );
};
