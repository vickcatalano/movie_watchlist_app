"use client";
import { useState } from "react";
import AllMovies from "../components/AllMovies";
import WatchedMovies from "../components/WatchedMovies";
import NotWatchedMovies from "../components/NotWatchedMovies";
import MoviesByRating from "../components/MoviesByRating";
import AddMovie from "../components/AddMovie";
import EditMovie from "../components/EditMovie";

export default function Home() {
  const [currentView, setCurrentView] = useState("all"); // all, watched, notWatched, rating
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [reloadKey, setReloadKey] = useState(0); // força reload nos componentes

  const handleAdded = () => {
    setShowAddModal(false);
    setReloadKey((prev) => prev + 1);
  };

  const handleUpdated = () => {
    setEditMovie(null);
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative p-4"
      style={{
        backgroundImage: "url('/images/background.jpg')",
      }}
    >
      {/* conteúdo principal */}
      <div className="relative z-10">
        {/* 🔥 Título estilizado tipo Netflix com efeito neon pulsante */}
        <div className="flex justify-center items-center mb-6">
          <h1
            className="text-5xl font-light tracking-wide neon-pulse"
            style={{
              color: "#8B0000",
              fontFamily: "'Fira Code', monospace",
              textShadow:
                "0 0 10px #8B0000, 0 0 20px #8B0000, 0 0 30px #8B0000, 0 0 40px #a00000, 0 0 70px #a00000",
            }}
          >
            Bytes Flix
          </h1>
        </div>

        {/* 🚀 Botões de navegação */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => setCurrentView("all")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Todos os filmes
          </button>
          <button
            onClick={() => setCurrentView("watched")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Só vistos
          </button>
          <button
            onClick={() => setCurrentView("notWatched")}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Por ver
          </button>
          <button
            onClick={() => setCurrentView("rating")}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Order by Rating
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            + Adicionar Filme
          </button>
        </div>

        {/* 📄 Componentes */}
        <div key={reloadKey}>
          {currentView === "all" && <AllMovies onEdit={setEditMovie} />}
          {currentView === "watched" && <WatchedMovies key={reloadKey} />}
          {currentView === "notWatched" && <NotWatchedMovies key={reloadKey} />}
          {currentView === "rating" && <MoviesByRating key={reloadKey} />}
        </div>

        {/* ➕ Modal Add */}
        {showAddModal && (
          <AddMovie
            onClose={() => setShowAddModal(false)}
            onAdded={handleAdded}
          />
        )}

        {/* ✏️ Modal Edit */}
        {editMovie && (
          <EditMovie
            movie={editMovie}
            onClose={() => setEditMovie(null)}
            onUpdated={handleUpdated}
          />
        )}
      </div>

      {/* 💡 Estilo custom inline para o efeito neon pulsante */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400&display=swap");

        @keyframes neonPulse {
          0% {
            text-shadow: 0 0 10px #8b0000, 0 0 20px #8b0000,
              0 0 30px #8b0000, 0 0 40px #a00000, 0 0 70px #a00000;
          }
          50% {
            text-shadow: 0 0 20px #a52a2a, 0 0 30px #a52a2a,
              0 0 40px #a52a2a, 0 0 60px #b22222, 0 0 90px #b22222;
          }
          100% {
            text-shadow: 0 0 10px #8b0000, 0 0 20px #8b0000,
              0 0 30px #8b0000, 0 0 40px #a00000, 0 0 70px #a00000;
          }
        }

        .neon-pulse {
          animation: neonPulse 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}