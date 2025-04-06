interface Snippet {
  id: string;
  title: string;
  description: string;
  video: Blob;
  filePath: string;
  thumbnail: Blob;
  thumbnailPath: string;
  duration: number;
  createdAt: Date;
}

export type VideoSnippet = Partial<Snippet>;
