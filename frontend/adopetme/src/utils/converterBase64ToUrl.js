function base64ToBlob(base64String) {
  const binaryString = atob(base64String);
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return new Blob([uint8Array]);
}

const converterBase64ToUrl = (base64String) => {
  const blob = base64ToBlob(base64String);
  const url = URL.createObjectURL(blob);
  return url;
};

export default converterBase64ToUrl;
