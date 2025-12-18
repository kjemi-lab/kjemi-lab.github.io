import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Molecule3D from './Molecule3D';

const MoleculeBuilder = () => {
  const [moleculeName, setMoleculeName] = useState('');
  const [moleculeData, setMoleculeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI('AIzaSyCBXFbI6OYMixr4kT97dEdVR4vN7EnxlzQ');

  const handleBuildMolecule = async () => {
    // Prevent multiple requests while one is already running
    if (loading || !moleculeName) {
      return;
    }

    setLoading(true);
    setMoleculeData(null); // Clear previous results

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are a molecule builder assistant for a chemistry visualization app. When the user asks for a molecule (like O₂, H₂O, or ozone), you must only return JSON that describes: Atoms (with element and ID), Bonds (connections between atoms and bond type: single, double, triple), Geometry (molecular shape: linear, bent, tetrahedral, trigonal planar, etc.). Always respond only with valid JSON, no explanations or extra text. Example: { "molecule": "Ozone", "atoms": [ {"id": 1, "element": "O"}, {"id": 2, "element": "O"}, {"id": 3, "element": "O"} ], "bonds": [ {"from": 1, "to": 2, "type": "double"}, {"from": 2, "to": 3, "type": "single"} ], "geometry": "bent" }\n\nBuild ${moleculeName}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // Extract JSON from response, removing any surrounding backticks or code blocks
      const jsonString = text.replace(/```(json)?/g, '').replace(/```/g, '');
      const data = JSON.parse(jsonString);
      setMoleculeData(data);
    } catch (error) {
      console.error('Error fetching molecule data:', error);
      alert(`Failed to build molecule. Please try again. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleBuildMolecule();
    }
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="bg-gray-900 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-primary">
          Molecule Builder
        </h2>
        <p className="mb-6 text-center text-gray-400">
          Enter the name of a molecule (e.g., Water, Methane, etc.) and I'll
          generate its structure.
        </p>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={moleculeName}
            onChange={(e) => setMoleculeName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter molecule name"
            className="bg-gray-800 border border-gray-600 rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleBuildMolecule}
            className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded-r-md"
            disabled={loading}
          >
            {loading ? 'Building...' : 'Build'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {moleculeData && (
            <div className="bg-gray-800 p-4 rounded-md">
              <pre className="text-white">
                {JSON.stringify(moleculeData, null, 2)}
              </pre>
          </div>
        )}
        {moleculeData && (
          <div>
            <Molecule3D moleculeData={moleculeData} />
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default MoleculeBuilder;
