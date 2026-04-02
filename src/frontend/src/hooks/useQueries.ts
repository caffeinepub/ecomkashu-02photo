import { useMutation } from "@tanstack/react-query";
import { ExternalBlob } from "../backend";
import { useActor } from "./useActor";

interface UploadProductImageParams {
  file: File;
  onProgress?: (percentage: number) => void;
}

export function useUploadProductImage() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ file, onProgress }: UploadProductImageParams) => {
      if (!actor) {
        throw new Error("Not connected");
      }
      const bytes = new Uint8Array(await file.arrayBuffer());
      let blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }
      return blob;
    },
  });
}
