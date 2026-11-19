(() => {
  const candidates = [
    'video/mp4;codecs=avc1.42E01E',
    'video/mp4',
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8'
  ];
  const supported = candidates.filter((type) => window.MediaRecorder && MediaRecorder.isTypeSupported(type));
  window.NEXExport = Object.freeze({
    supportedMimeTypes: supported,
    hasNativeMp4: supported.some((type) => type.startsWith('video/mp4')),
    hasWebm: supported.some((type) => type.startsWith('video/webm')),
    status() {
      return {
        mediaRecorder: typeof window.MediaRecorder !== 'undefined',
        supportedMimeTypes: [...supported],
        mp4Available: supported.some((type) => type.startsWith('video/mp4'))
      };
    }
  });
})();
