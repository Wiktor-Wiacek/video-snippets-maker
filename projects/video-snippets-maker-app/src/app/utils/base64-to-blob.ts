export function base64ToBlob(base64: string, contentType = ''): Blob {
  if (!base64) {
    throw new Error('Base64 string is empty or undefined');
  }
  const base64Data = base64.split(',')[1]; // Remove data:*/*;base64, prefix if present
  const byteCharacters = atob(base64Data);
  const byteArrays: Uint8Array[] = [];

  for (let i = 0; i < byteCharacters.length; i += 512) {
    const slice = byteCharacters.slice(i, i + 512);
    const byteNumbers = new Array(slice.length);

    for (let j = 0; j < slice.length; j++) {
      byteNumbers[j] = slice.charCodeAt(j);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}
