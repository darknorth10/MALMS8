import YouTube from "react-youtube"


export default function RelatedVideo({videoId}) {
    return (
      <div className="w-full my-6 mx-auto">
        <YouTube 
            videoId={videoId}
            
            iframeClassName="w-full h-[50vh] rounded-lg drop-shadow"

            loading="eager"

            className="w-full"

            
        />
      </div>
    );
  }