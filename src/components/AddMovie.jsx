"use client";
import { useState } from "react";
import { addMovie } from "../services/api";

export default function AddMovie({ onClose, onAdded }) {
  const [form, setForm] = useState({
    title: "",
    year: "",
    genre: "",
    rating: "",
    watched: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.year || !form.genre || !form.rating) {
      setError("Preencha todos os campos obrigatórios!");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await addMovie({
        ...form,
        year: Number(form.year),
        rating: Number(form.rating),
      });

      if (onAdded) onAdded();
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      setError("Erro ao adicionar filme 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-300 text-gray-800 shadow-lg rounded-xl p-6 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
        Adicionar Filme
      </h2>

      {error && <p className="text-red-500 text-center mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-md p-2 text-black"
        />
        <input
          name="year"
          type="number"
          placeholder="Ano"
          value={form.year}
          onChange={handleChange}
          className="w-full border rounded-md p-2 text-black"
        />
        <input
          name="genre"
          placeholder="Gênero"
          value={form.genre}
          onChange={handleChange}
          className="w-full border rounded-md p-2 text-black"
        />
        <input
          name="rating"
          type="number"
          placeholder="Classificação (1–10)"
          min="1"
          max="10"
          value={form.rating}
          onChange={handleChange}
          className="w-full border rounded-md p-2 text-black"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="watched"
            checked={form.watched}
            onChange={handleChange}
          />
          <span>Já assistido?</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#800020] text-white py-2 rounded-md hover:bg-[#66001a] transition"
        >
          {loading ? "Adicionando..." : "Adicionar Filme"}
        </button>
      </form>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancelar
        </button>
      )}
    </div>
  );
}
