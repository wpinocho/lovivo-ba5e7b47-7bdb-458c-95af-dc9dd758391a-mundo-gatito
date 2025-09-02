import React, { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

interface FilterBarProps {
  onFilter: (breed: string, priceRange: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  console.log('FilterBar rendered with breed:', selectedBreed, 'price:', selectedPriceRange);

  const breeds = [
    { value: 'all', label: 'Todas las razas' },
    { value: 'persa', label: 'Persa' },
    { value: 'maine coon', label: 'Maine Coon' },
    { value: 'siamés', label: 'Siamés' },
    { value: 'británico', label: 'Británico' },
    { value: 'ragdoll', label: 'Ragdoll' },
    { value: 'bengalí', label: 'Bengalí' },
    { value: 'abisinio', label: 'Abisinio' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Todos los precios' },
    { value: '0-700', label: '$0 - $700' },
    { value: '700-1000', label: '$700 - $1000' },
    { value: '1000-1500', label: '$1000 - $1500' },
    { value: '1500', label: '$1500+' }
  ];

  const handleBreedChange = (breed: string) => {
    console.log('Breed filter changed to:', breed);
    setSelectedBreed(breed);
    onFilter(breed, selectedPriceRange);
  };

  const handlePriceChange = (priceRange: string) => {
    console.log('Price filter changed to:', priceRange);
    setSelectedPriceRange(priceRange);
    onFilter(selectedBreed, priceRange);
  };

  const clearFilters = () => {
    console.log('Clearing all filters');
    setSelectedBreed('all');
    setSelectedPriceRange('all');
    onFilter('all', 'all');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <FunnelIcon className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Raza
          </label>
          <select
            value={selectedBreed}
            onChange={(e) => handleBreedChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {breeds.map((breed) => (
              <option key={breed.value} value={breed.value}>
                {breed.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rango de precio
          </label>
          <select
            value={selectedPriceRange}
            onChange={(e) => handlePriceChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};