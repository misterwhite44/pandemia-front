import React, { useState } from "react";

function PredictionComponent() {
  const [resultText, setResultText] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const handlePrediction = () => {
    fetch("http://localhost:8000/api/v1/predict?target=new_cases&country_name=France&days_ahead=7")
      .then(res => {
        if (!res.ok) {
          throw new Error("Erreur HTTP");
        }
        return res.json();
      })
      .then(data => {
        console.log("Réponse IA :", data);

        if (data.image_path) {
          setImageUrl(`http://localhost:8000/${data.image_path}`);
        } else {
          setImageUrl(null);
        }

        setResultText(JSON.stringify(data.prediction || data, null, 2));
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Erreur lors de la récupération de la prédiction.");
        setResultText(null);
        setImageUrl(null);
      });
  };

  return (
    <div style={{ backgroundColor: "white", color: "black", padding: "1rem", minHeight: "100vh" }}>
      <h2>Prédiction IA</h2>
      <button onClick={handlePrediction}>Lancer la prédiction</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {resultText && (
        <>
          <h3>Résultat des prédictions :</h3>
          <pre style={{ backgroundColor: "white", color: "black", padding: "1rem", whiteSpace: "pre-wrap", border: "1px solid #ccc" }}>
            {resultText}
          </pre>
        </>
      )}

      {imageUrl && (
        <div>
          <h3>Graphique de la prédiction :</h3>
          <img src={imageUrl} alt="Résultat prédiction" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}

export default PredictionComponent;
