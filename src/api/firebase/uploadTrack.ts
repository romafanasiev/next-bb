import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { licenseTypes } from '@constants';
import { storage } from 'utils';
import { getAudioDuration } from 'helpers';

import type { ITrack, TUploadForm } from 'types';

export const uploadTrack = async (
  data: TUploadForm,
  progressFunc?: (progress: number) => void,
  errorFunc?: (message: string) => void,
): Promise<ITrack> => {
  const uuid = uuidv4();
  const {
    cover,
    fullVersion,
    preview,
    title,
    tags,
    bpm,
    standardPrice,
    premiumPrice,
    key,
    exclusiveVersion,
  } = data;
  const files = [cover[0], preview[0], fullVersion[0], exclusiveVersion[0]];
  const duration = await getAudioDuration(fullVersion[0]);
  const totalFilesSize = files.reduce((acc, file) => acc + file.size, 0);
  let uploadedBytesSize = 0;
  const promises = [];

  for (let i = 0; i < files.length; i++) {
    let fileName = 'cover';
    const fileExtension = files[i].name.split('.');

    switch (i) {
      case 1:
        fileName = licenseTypes.demo;
        break;
      case 2:
        fileName = licenseTypes.fullTrack;
        break;
      case 3:
        fileName = licenseTypes.exclusive;
        break;
    }

    const storageRef = ref(
      storage,
      `tracks/${uuid}/${
        fileName + '.' + fileExtension[fileExtension.length - 1]
      }`,
    );
    const uploadTask = uploadBytesResumable(storageRef, files[i], {
      contentType: files[i].type,
    });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        uploadedBytesSize = snapshot.bytesTransferred;
        const progress = Math.round((uploadedBytesSize / totalFilesSize) * 100);
        progressFunc && progressFunc(progress);
      },
      (error) => {
        errorFunc && errorFunc(error.message);
      },
    );

    if (i < 2) {
      promises.push(
        uploadTask.then((uploadResult) =>
          getDownloadURL(uploadResult.ref),
        ) as Promise<string>,
      );
    } else {
      promises.push(uploadTask.then(() => 'success') as Promise<string>);
    }
  }

  const track = await Promise.all(promises).then((res) => [res[0], res[1]]);

  return {
    id: uuid,
    coverUrl: track[0],
    demoUrl: track[1],
    title: title.toLowerCase(),
    tags: tags.toLowerCase(),
    bpm,
    standardPrice,
    premiumPrice,
    key,
    exclusive: false,
    duration,
  };
};
