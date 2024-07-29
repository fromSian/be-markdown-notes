const Video = ({ src }: { src: string }) => {
  return (
    <div className="shadow-lg my-2 flex flex-col items-center">
      <video src={src} controls className="max-h-[90vh]"></video>
    </div>
  );
};

export default Video;
