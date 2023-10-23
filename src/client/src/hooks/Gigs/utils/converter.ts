import { AxiosInstance } from "axios";

export async function blobUrlsToFiles(
  requestor: AxiosInstance,
  urls: string[]
) {
  return Promise.all(
    urls.map(async (url) => {
      if (url.includes("blob")) {
        return await blobUrlToFile(url);
      } else {
        return await imageUrlToFile(requestor, url);
      }
    })
  );
}

async function imageUrlToFile(requestor: AxiosInstance, url: string) {
  // Fetch blob
  const res = await requestor.get<Blob>(url, {
    responseType: "blob",
  });
  const blob = res.data;

  // Construct File object
  const file = new File([blob], "image.jpg");

  return file;
}

async function blobUrlToFile(blobUrlString: string) {
  // Parse blob URL string
  const blobUrl = new URL(blobUrlString);

  // Fetch blob
  const res = await fetch(blobUrl);
  const blob = await res.blob();

  // Construct File object
  const file = new File([blob], "image.jpg");

  return file;
}
