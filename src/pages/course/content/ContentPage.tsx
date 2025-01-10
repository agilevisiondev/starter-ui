import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContentUpload from "./contentUpload";


const ContentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Content Management</h1>
      <Button onClick={() => setIsModalOpen(true)}>Upload New Content</Button>
      <ContentUpload/>
    </div>
  );
}


export default ContentPage
