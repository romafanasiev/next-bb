export const getAudioDuration = (file: File): Promise<number> => {
  const url = URL.createObjectURL(file);

  return new Promise((resolve) => {
    const audio = document.createElement('audio');
    audio.muted = true;
    const source = document.createElement('source');
    source.src = url;
    audio.preload = 'metadata';
    audio.appendChild(source);
    audio.onloadedmetadata = function () {
      resolve(+Number.parseFloat(`${audio.duration}`).toFixed(2));
    };
  });
};
