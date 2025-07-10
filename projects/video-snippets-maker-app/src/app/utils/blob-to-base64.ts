export function blobToBase64(blob: Blob): Promise<string> {
  if (!(blob instanceof Blob)) {
    return Promise.reject(new Error('Input is not a Blob'));
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert blob to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
