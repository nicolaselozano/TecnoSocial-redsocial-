import React from 'react';
import { useParams } from 'react-router-dom'; 
import SimilarProfiles from '../SimilarProfiles';

const SimilarProfilesPage = () => {
  const { userId } = useParams();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Perfiles Similares</h1>
      <SimilarProfiles userId={userId} />
    </div>
  );
};

export default SimilarProfilesPage;
