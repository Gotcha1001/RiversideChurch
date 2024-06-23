import UploadVideoForm from "@/components/UploadVideoForm";


export default function UploadVideo() {
    const handleVideoUploaded = () => {
      alert('Video uploaded successfully!');
    };
  
    return (
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-black to-white p-4">
        <h1 className="text-4xl font-bold text-white my-8">Upload Video</h1>
        <UploadVideoForm onVideoUploaded={handleVideoUploaded} />
      </div>
    );
  }